'use client';

/**
 * Stagger — injects incremental `delay` props into a list of Reveal children.
 *
 * Usage:
 *   <Stagger stagger={120} className="grid ...">
 *     {items.map((item) => (
 *       <Reveal key={item.id} from="bottom" scale>
 *         ...
 *       </Reveal>
 *     ))}
 *   </Stagger>
 *
 * Stagger uses React.cloneElement to override each child's `delay` prop with
 * an index-based value. All direct children must accept a `delay?: number` prop
 * (i.e. they should be Reveal components).
 */

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from 'react';

interface StaggerProps {
  children:       ReactNode;
  /** Milliseconds between each successive child's animation start. */
  stagger?:       number;
  /** Additional delay before the first child starts. */
  initialDelay?:  number;
  /** Optional className for the wrapping container div. */
  className?:     string;
}

export default function Stagger({
  children,
  stagger      = 120,
  initialDelay = 0,
  className,
}: StaggerProps) {
  const cloned = Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cloneElement(child as React.ReactElement<any>, {
      delay: initialDelay + i * stagger,
    });
  });

  // If no className is needed, return a fragment to avoid adding extra DOM nodes
  if (!className) return <>{cloned}</>;
  return <div className={className}>{cloned}</div>;
}
