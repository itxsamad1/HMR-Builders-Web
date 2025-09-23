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
const DEFAULT_MAGNIFICATION = 50;
const DEFAULT_DISTANCE = 100;

type StickyDockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  magnification?: number;
  spring?: SpringOptions;
};
type StickyDockItemProps = {
  className?: string;
  children: React.ReactNode;
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
}: StickyDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex max-w-full items-center justify-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={cn(
          'flex w-fit gap-2 rounded-2xl px-3 py-2',
          className
        )}
        style={{ height: DOCK_HEIGHT }}
        role='toolbar'
        aria-label='Application dock'
      >
        <StickyDockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </StickyDockProvider>
      </motion.div>
    </div>
  );
}

function StickyDockItem({ children, className }: StickyDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { distance, magnification, mouseX, spring } = useStickyDock();

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

  return (
    <motion.div
      ref={ref}
      style={{ width }}
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
        cloneElement(child as React.ReactElement, { width, isHovered })
      )}
    </motion.div>
  );
}

function StickyDockLabel({ children, className, ...rest }: StickyDockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps['isHovered'] as MotionValue<number>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

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

  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

export { StickyDock, StickyDockIcon, StickyDockItem, StickyDockLabel };
