/** Shared mutable camera orbit angle (radians). A plain object (not React state) so
 * dragging the screen and reading it in the player/camera frame loops never re-renders. */
export const cameraYaw = { value: 0 }
