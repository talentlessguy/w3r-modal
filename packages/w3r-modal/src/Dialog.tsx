import { clsx } from './clsx'
import React, { forwardRef, MouseEventHandler, ReactNode, RefObject, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { mergeRefs } from 'react-merge-refs'
import * as styles from './Dialog.css'

const moveFocusWithin = (element: HTMLElement, position: 'start' | 'end') => {
  const focusableElements = element.querySelectorAll('button, a[href]') as NodeListOf<
    HTMLButtonElement | HTMLAnchorElement
  >

  if (focusableElements.length === 0) return

  focusableElements[position === 'end' ? focusableElements.length - 1 : 0].focus()
}

export const FocusTrap = forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const finalRef = mergeRefs([contentRef, ref])

  return (
    <>
      <div
        onFocus={useCallback(() => contentRef.current && moveFocusWithin(contentRef.current, 'end'), [])}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      />
      <div ref={finalRef} {...props} />
      <div
        onFocus={useCallback(() => contentRef.current && moveFocusWithin(contentRef.current, 'start'), [])}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      />
    </>
  )
})

FocusTrap.displayName = 'FocusTrap'

const stopPropagation: MouseEventHandler<unknown> = (event) => event.stopPropagation()

interface DialogProps {
  open: boolean
  onClose?: () => void
  titleId: string
  initialFocusRef: RefObject<HTMLElement | null>
  children: ReactNode
  classNames?: Partial<{
    overlay: string
    content: string
  }>
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, classNames, initialFocusRef, onClose = () => void 0, open, titleId }, ref) => {
    useEffect(() => {
      const previouslyActiveElement = document.activeElement

      initialFocusRef?.current?.focus()

      return () => {
        (previouslyActiveElement as HTMLElement).focus?.()
      }
    }, [initialFocusRef])

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => open && event.key === 'Escape' && onClose()

      document.addEventListener('keydown', handleEscape)

      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    const handleBackdropClick = useCallback(() => onClose(), [onClose])

    return (
      <>
        {open
          ? createPortal(
              <div
                aria-labelledby={titleId}
                aria-modal
                className={clsx(styles.overlay, classNames?.overlay)}
                onClick={handleBackdropClick}
                role="dialog"
              >
                <FocusTrap
                  className={clsx(styles.content, classNames?.content)}
                  onClick={stopPropagation}
                  ref={ref}
                  role="document"
                >
                  {children}
                </FocusTrap>
              </div>,
              document.body
            )
          : null}
      </>
    )
  }
)

Dialog.displayName = 'Dialog'
