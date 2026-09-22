import type { useJoystick } from '../../hooks/useJoystick'

interface JoystickProps {
  joystick: ReturnType<typeof useJoystick>
}

export function Joystick({ joystick }: JoystickProps) {
  return (
    <div className="joystick-zone" ref={joystick.baseRef} {...joystick.handlers}>
      <div className="joystick-base">
        <div className="joystick-nub" ref={joystick.nubRef} />
      </div>
    </div>
  )
}
