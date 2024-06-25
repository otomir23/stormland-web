"use client"

import ReactSkinview3d, { ReactSkinview3dOptions } from "react-skinview3d"
import { SkinViewer, WalkingAnimation } from "skinview3d"
import { useMemo } from "react"

export default function SkinRenderer(
    props: Omit<ReactSkinview3dOptions, "width" | "height">
) {
    const anim = useMemo(() => {
        const anim = new WalkingAnimation()
        anim.headBobbing = false
        anim.speed = 0.5
        return anim
    }, [])

    const resize = (v: SkinViewer) => {
        const c = v.canvas
        c.removeAttribute("style")
        c.width = c.clientWidth
        c.height = c.clientHeight
        v.setSize(c.clientWidth, c.clientHeight)
    }

    return (
        // @ts-expect-error Some React 19 type mismatches
        <ReactSkinview3d
            {...props}
            width={0}
            height={0}
            options={{
                animation: anim,
                ...props.options,
            }}
            onReady={({ viewer }) => {
                const { controls } = viewer
                controls.enableDamping = true
                controls.enableZoom = false
                controls.dampingFactor = 0.25
                requestAnimationFrame(() => resize(viewer))
                window.onresize = () => resize(viewer)
            }}
        />
    )
}
