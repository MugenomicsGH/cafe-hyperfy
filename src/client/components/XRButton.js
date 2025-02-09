import { css } from '@firebolt-dev/css'

export function XRButton({ world }) {
  const onSessionStart = async session => {
    world.entities.player.avatar.unmount()
    world.entities.player.cam.rotation.set(0, 0, 0)
    world.xr.setSession(session)
    world.nametags.setOrientationSource(world.graphics.renderer.xr.getCamera().quaternion)
  }

  const onSessionEnd = () => {
    world.entities.player.avatar.mount()
    world.nametags.setOrientationSource(world.rig.quaternion)
    world.camera.position.set(0, 0, 0)
    world.camera.rotation.set(0, 0, 0)
  }

  const onClick = async () => {
    const session = await navigator.xr.requestSession('immersive-vr')
    session.addEventListener('end', onSessionEnd)
    onSessionStart(session)
  }

  return (
    <div
      css={css`
        pointer-events: auto;
        position: absolute;
        bottom: 20px;
        right: 20px;
        border-radius: 25px;
        background: rgba(22, 22, 28, 0.2);
        border: 1px solid rgba(255, 255, 255, 0);
        box-shadow: rgba(0, 0, 0, 0) 0px 10px 30px;
        border-radius: 10px;
        padding: 8px;
        &:hover {
          background: rgba(22, 22, 28, 1);
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 30px;
          cursor: pointer;
        }
      `}
      onClick={onClick}
    >
      Enter VR
    </div>
  )
}
