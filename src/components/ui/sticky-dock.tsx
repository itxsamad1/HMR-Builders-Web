'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

const DOCK_HEIGHT = 64;
const COMPACT_HEIGHT = 56;
const DEFAULT_MAGNIFICATION = 50;
const DEFAULT_DISTANCE = 100;

type StickyDockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  magnification?: number;
  spring?: SpringOptions;
  isCompact?: boolean; // New prop for compact mode
  fullNavContent?: React.ReactNode; // New prop for full navbar content
  compactOpacity?: number; // New prop for compact content opacity
};

type StickyDockItemProps = {
  className?: string;
  children: React.ReactNode;
  showInFull?: boolean; // New prop to control visibility in full mode
};

type StickyDockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

type StickyDockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type StickyDockContextType = {
  mouseX: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
  isCompact: boolean;
};

type StickyDockProviderProps = {
  children: React.ReactNode;
  value: StickyDockContextType;
};

const StickyDockContext = createContext<StickyDockContextType | undefined>(undefined);

function StickyDockProvider({ children, value }: StickyDockProviderProps) {
  return <StickyDockContext.Provider value={value}>{children}</StickyDockContext.Provider>;
}

function useStickyDock() {
  const context = useContext(StickyDockContext);
  if (!context) {
    throw new Error('useStickyDock must be used within an StickyDockProvider');
  }
  return context;
}

function StickyDock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 200, damping: 15 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  isCompact = false,
  fullNavContent,
  compactOpacity = 1,
}: StickyDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex max-w-full items-center justify-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          if (isCompact) {
            mouseX.set(pageX);
          }
        }}
        onMouseLeave={() => {
          if (isCompact) {
            mouseX.set(Infinity);
          }
        }}
        className={cn(
          'flex items-center justify-between',
          isCompact 
            ? 'w-fit gap-2 rounded-2xl px-3 py-2' 
            : 'w-full rounded-2xl px-6',
          className
        )}
        style={{ 
          height: isCompact ? COMPACT_HEIGHT : DOCK_HEIGHT,
          transition: "height 300ms ease-out, padding 300ms ease-out"
        }}
        role='toolbar'
        aria-label='Application dock'
      >
        <StickyDockProvider value={{ mouseX, spring, distance, magnification, isCompact }}>
          {/* Full navbar content when not compact */}
          {!isCompact && fullNavContent}
          
          {/* Dock items when compact with smooth opacity */}
          {isCompact && (
            <div style={{ opacity: compactOpacity, transition: "opacity 150ms ease-out" }}>
              {children}
            </div>
          )}
        </StickyDockProvider>
      </motion.div>
    </div>
  );
}

function StickyDockItem({ children, className, showInFull = false }: StickyDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { distance, magnification, mouseX, spring, isCompact } = useStickyDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthTransform, spring);

  // Don't render in full mode unless explicitly shown
  if (!isCompact && !showInFull) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: isCompact ? width : 'auto' }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
      tabIndex={0}
      role='button'
      aria-haspopup='true'
    >
      {Children.map(children, (child) =>
        child ? cloneElement(child as React.ReactElement, { width, isHovered, isCompact }) : null
      )}
    </motion.div>
  );
}

function StickyDockLabel({ children, className, ...rest }: StickyDockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps['isHovered'] as MotionValue<number>;
  const isCompact = restProps['isCompact'] as boolean;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isCompact || !isHovered) return;
    
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered, isCompact]);

  // Only show labels in compact mode
  if (!isCompact) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: -12, scale: 1 }}
          exit={{ opacity: 0, y: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            'absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md px-2 py-1 text-xs',
            className
          )}
          role='tooltip'
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StickyDockIcon({ children, className, ...rest }: StickyDockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const width = restProps['width'] as MotionValue<number>;
  const isCompact = restProps['isCompact'] as boolean;

  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: isCompact ? widthTransform : 'auto' }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

export { StickyDock, StickyDockIcon, StickyDockItem, StickyDockLabel };