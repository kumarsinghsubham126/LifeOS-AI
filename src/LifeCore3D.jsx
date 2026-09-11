import { Canvas, useFrame } from '@react-three/fiber'
import {
    Float,
    OrbitControls,
    Sparkles,
} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

/* =========================================================
   LIFEOS 3D SYSTEM
   Premium procedural holographic scenes
========================================================= */

/* =========================================================
   COMMON — GLOW RING
========================================================= */

function Ring({
    radius,
    color,
    speed = 0.5,
    rotation = [0, 0, 0],
    tube = 0.014,
    opacity = 0.8,
}) {
    const ref = useRef()

    useFrame((_, delta) => {
        if (!ref.current) return

        ref.current.rotation.z += delta * speed
        ref.current.rotation.x += delta * speed * 0.08
    })

    return (
        <mesh ref={ref} rotation={rotation}>
            <torusGeometry
                args={[
                    radius,
                    tube,
                    12,
                    120,
                ]}
            />

            <meshBasicMaterial
                color={color}
                transparent
                opacity={opacity}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}

/* =========================================================
   COMMON — ORBITING DOT
========================================================= */

function OrbitDot({
    radius = 1.5,
    speed = 1,
    color = '#35ddff',
    offset = 0,
    y = 0,
    size = 0.055,
}) {
    const ref = useRef()

    useFrame((state) => {
        if (!ref.current) return

        const t =
            state.clock.elapsedTime * speed + offset

        ref.current.position.x =
            Math.cos(t) * radius

        ref.current.position.z =
            Math.sin(t) * radius

        ref.current.position.y =
            y + Math.sin(t * 1.7) * 0.08
    })

    return (
        <mesh ref={ref}>
            <sphereGeometry
                args={[size, 12, 12]}
            />

            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}

/* =========================================================
   COMMON — FLOATING DATA NODE
========================================================= */

function DataNode({
    position,
    color = '#35ddff',
    scale = 1,
    speed = 1.4,
}) {
    return (
        <Float
            speed={speed}
            rotationIntensity={0.25}
            floatIntensity={0.45}
        >
            <group position={position}>
                <mesh scale={scale}>
                    <icosahedronGeometry
                        args={[0.11, 1]}
                    />

                    <meshBasicMaterial
                        color={color}
                        wireframe
                        transparent
                        opacity={0.9}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                <mesh scale={scale * 0.35}>
                    <sphereGeometry
                        args={[0.12, 16, 16]}
                    />

                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.8}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>
        </Float>
    )
}

/* =========================================================
   COMMON — MOUSE PARALLAX
========================================================= */

function ParallaxGroup({
    children,
    intensity = 0.25,
}) {
    const ref = useRef()

    useFrame((state) => {
        if (!ref.current) return

        ref.current.rotation.y =
            THREE.MathUtils.lerp(
                ref.current.rotation.y,
                state.pointer.x * intensity,
                0.035
            )

        ref.current.rotation.x =
            THREE.MathUtils.lerp(
                ref.current.rotation.x,
                state.pointer.y * intensity,
                0.035
            )
    })

    return (
        <group ref={ref}>
            {children}
        </group>
    )
}

/* =========================================================
   OVERVIEW
   ORANGE / RED / GOLD ENERGY REACTOR
========================================================= */

function OverviewScene() {
    const groupRef = useRef()
    const coreRef = useRef()
    const auraRef = useRef()

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime

        if (!groupRef.current) return

        groupRef.current.rotation.y +=
            delta * 0.14

        groupRef.current.rotation.x =
            THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                state.pointer.y * 0.10,
                0.035
            )

        groupRef.current.rotation.z =
            THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                -state.pointer.x * 0.08,
                0.035
            )

        const intro =
            Math.min(1, t / 0.45)

        const eased =
            1 - Math.pow(1 - intro, 3)

        const pulse =
            1 +
            Math.sin(t * 1.5) *
            0.018

        groupRef.current.scale.setScalar(
            eased * pulse
        )

        if (coreRef.current) {
            coreRef.current.scale.setScalar(
                1 +
                Math.sin(t * 2.4) *
                0.045
            )

            coreRef.current.rotation.x +=
                delta * 0.12

            coreRef.current.rotation.z +=
                delta * 0.08
        }

        if (auraRef.current) {
            auraRef.current.scale.setScalar(
                1 +
                Math.sin(t * 1.2) *
                0.035
            )
        }
    })

    return (
        <group
            ref={groupRef}
            scale={0.01}
        >
            {/* Orange outer shell */}

            <mesh>
                <icosahedronGeometry
                    args={[1.65, 2]}
                />

                <meshStandardMaterial
                    color="#ff4d00"
                    emissive="#ff2400"
                    emissiveIntensity={1.7}
                    metalness={0.72}
                    roughness={0.18}
                    wireframe
                    transparent
                    opacity={0.58}
                />
            </mesh>

            {/* Secondary orange glass shell */}

            <mesh scale={1.02}>
                <icosahedronGeometry
                    args={[1.48, 2]}
                />

                <meshStandardMaterial
                    color="#ff7a18"
                    emissive="#ff4d00"
                    emissiveIntensity={1.15}
                    metalness={0.55}
                    roughness={0.12}
                    wireframe
                    transparent
                    opacity={0.24}
                />
            </mesh>

            {/* Red aura */}

            <mesh
                ref={auraRef}
                scale={1.02}
            >
                <sphereGeometry
                    args={[0.94, 40, 40]}
                />

                <meshBasicMaterial
                    color="#ff3b00"
                    transparent
                    opacity={0.055}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Gold energy core */}

            <mesh ref={coreRef}>
                <sphereGeometry
                    args={[0.72, 48, 48]}
                />

                <meshStandardMaterial
                    color="#ffb347"
                    emissive="#ff3d00"
                    emissiveIntensity={3.8}
                    metalness={0.22}
                    roughness={0.10}
                    transparent
                    opacity={0.78}
                />
            </mesh>

            {/* Hot center */}

            <mesh scale={0.48}>
                <sphereGeometry
                    args={[0.72, 32, 32]}
                />

                <meshBasicMaterial
                    color="#fff1b8"
                    transparent
                    opacity={0.72}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Multicolour neural nodes */}

            <mesh position={[0.95, 0.55, 0.35]}>
                <sphereGeometry
                    args={[0.055, 16, 16]}
                />
                <meshBasicMaterial color="#ff6b35" />
            </mesh>

            <mesh position={[-0.85, 0.42, 0.55]}>
                <sphereGeometry
                    args={[0.045, 16, 16]}
                />
                <meshBasicMaterial color="#22d3ee" />
            </mesh>

            <mesh position={[0.55, -0.75, 0.45]}>
                <sphereGeometry
                    args={[0.05, 16, 16]}
                />
                <meshBasicMaterial color="#ff2d95" />
            </mesh>

            <mesh position={[-0.62, -0.62, -0.35]}>
                <sphereGeometry
                    args={[0.045, 16, 16]}
                />
                <meshBasicMaterial color="#a855f7" />
            </mesh>

            <mesh position={[0.15, 0.95, -0.65]}>
                <sphereGeometry
                    args={[0.04, 16, 16]}
                />
                <meshBasicMaterial color="#38bdf8" />
            </mesh>

            <mesh position={[-0.35, 0.18, 0.85]}>
                <sphereGeometry
                    args={[0.035, 16, 16]}
                />
                <meshBasicMaterial color="#84cc16" />
            </mesh>

            {/* Local lighting */}

            <pointLight
                position={[0, 0, 1.8]}
                color="#ff3d00"
                intensity={3.8}
                distance={5}
            />

            <pointLight
                position={[1.5, 0.5, 0.5]}
                color="#ff8a00"
                intensity={2.4}
                distance={4}
            />

            <pointLight
                position={[-1.2, -0.8, 0.4]}
                color="#a855f7"
                intensity={1.5}
                distance={3.5}
            />

            <pointLight
                position={[0.3, -1.2, 0.8]}
                color="#06b6d4"
                intensity={1.3}
                distance={3}
            />

            <pointLight
                position={[-0.8, 0.8, -0.8]}
                color="#ec4899"
                intensity={1.1}
                distance={3}
            />
        </group>
    )
}

/* =========================================================
   AI ASSISTANT
   VIOLET / PINK NEURAL INTELLIGENCE
========================================================= */

function AIScene() {
    const brain = useRef()
    const core = useRef()
    const aura = useRef()

    const nodes = [
        [-1.25, 0.62, 0.15],
        [-1.05, -0.62, 0],
        [-0.35, 1.02, 0.12],
        [0.38, 1.02, 0],
        [1.12, 0.55, 0.1],
        [1.15, -0.55, 0],
        [0.38, -1.0, 0.1],
        [-0.38, -0.95, 0],
    ]

    useFrame((state, delta) => {
        if (!brain.current) return

        brain.current.rotation.y +=
            delta * 0.075

        brain.current.rotation.z +=
            delta * 0.018

        if (core.current) {
            const pulse =
                1 +
                Math.sin(
                    state.clock.elapsedTime * 2.3
                ) *
                0.04

            core.current.scale.setScalar(
                pulse
            )
        }

        if (aura.current) {
            aura.current.scale.setScalar(
                1 +
                Math.sin(
                    state.clock.elapsedTime * 1.5
                ) *
                0.035
            )
        }
    })

    return (
        <ParallaxGroup intensity={0.22}>
            <group ref={brain}>

                {/* outer neural crystal */}

                <mesh>
                    <icosahedronGeometry
                        args={[1.28, 3]}
                    />

                    <meshBasicMaterial
                        color="#a855f7"
                        wireframe
                        transparent
                        opacity={0.42}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* second shell */}

                <mesh scale={0.88}>
                    <icosahedronGeometry
                        args={[1.28, 2]}
                    />

                    <meshBasicMaterial
                        color="#ec4899"
                        wireframe
                        transparent
                        opacity={0.22}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* aura */}

                <mesh ref={aura}>
                    <sphereGeometry
                        args={[0.92, 32, 32]}
                    />

                    <meshBasicMaterial
                        color="#d946ef"
                        transparent
                        opacity={0.055}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* violet core */}

                <mesh
                    ref={core}
                    scale={0.66}
                >
                    <sphereGeometry
                        args={[1, 40, 40]}
                    />

                    <meshStandardMaterial
                        color="#6d28d9"
                        emissive="#c026d3"
                        emissiveIntensity={3.4}
                        metalness={0.68}
                        roughness={0.12}
                        transparent
                        opacity={0.82}
                    />
                </mesh>

                {/* pink signal core */}

                <mesh scale={0.34}>
                    <sphereGeometry
                        args={[1, 28, 28]}
                    />

                    <meshBasicMaterial
                        color="#ff7ad9"
                        transparent
                        opacity={0.72}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* neural rings */}

                <Ring
                    radius={1.38}
                    color="#f472b6"
                    speed={0.55}
                    rotation={[
                        0.65,
                        0.15,
                        0,
                    ]}
                    opacity={0.7}
                />

                <Ring
                    radius={1.62}
                    color="#a855f7"
                    speed={-0.36}
                    rotation={[
                        0.2,
                        0.8,
                        0.35,
                    ]}
                    opacity={0.52}
                />

                {/* neural nodes */}

                {nodes.map(
                    (position, index) => (
                        <DataNode
                            key={index}
                            position={position}
                            color={
                                index % 3 === 0
                                    ? '#ff4fbf'
                                    : index % 3 === 1
                                        ? '#a855f7'
                                        : '#22d3ee'
                            }
                            scale={
                                index % 2 === 0
                                    ? 0.9
                                    : 0.62
                            }
                            speed={
                                1.05 +
                                index * 0.08
                            }
                        />
                    )
                )}

                <OrbitDot
                    radius={1.55}
                    speed={0.42}
                    color="#ff5ac8"
                    offset={0}
                    size={0.045}
                />

                <OrbitDot
                    radius={1.68}
                    speed={-0.3}
                    color="#39ddff"
                    offset={2.2}
                    y={0.08}
                    size={0.04}
                />

                {/* AI lighting */}

                <pointLight
                    color="#b026ff"
                    intensity={6}
                    distance={5}
                />

                <pointLight
                    color="#ff3cae"
                    intensity={3.5}
                    distance={4}
                    position={[1, 0.6, 1]}
                />

                <pointLight
                    color="#20dfff"
                    intensity={2.2}
                    distance={4}
                    position={[-1, -0.7, 1]}
                />

            </group>
        </ParallaxGroup>
    )
}

/* =========================================================
   GOALS
   ORANGE / GOLD TARGET SYSTEM
========================================================= */

function GoalsScene() {
    const target = useRef()
    const nucleus = useRef()

    useFrame((state, delta) => {
        if (!target.current) return

        target.current.rotation.z +=
            delta * 0.13

        target.current.rotation.y +=
            delta * 0.055

        if (nucleus.current) {
            nucleus.current.scale.setScalar(
                1 +
                Math.sin(
                    state.clock.elapsedTime * 2.2
                ) *
                0.05
            )
        }
    })

    return (
        <ParallaxGroup intensity={0.20}>
            <group ref={target}>

                {/* large target */}

                <mesh>
                    <torusGeometry
                        args={[
                            1.28,
                            0.065,
                            20,
                            120,
                        ]}
                    />

                    <meshStandardMaterial
                        color="#ff6b2c"
                        emissive="#ff3d18"
                        emissiveIntensity={2.2}
                        metalness={0.82}
                        roughness={0.14}
                    />
                </mesh>

                <mesh
                    rotation={[
                        0,
                        0,
                        Math.PI / 2,
                    ]}
                >
                    <torusGeometry
                        args={[
                            0.92,
                            0.052,
                            20,
                            100,
                        ]}
                    />

                    <meshStandardMaterial
                        color="#ff9f2f"
                        emissive="#ff6718"
                        emissiveIntensity={2}
                        metalness={0.76}
                        roughness={0.14}
                    />
                </mesh>

                <mesh
                    rotation={[
                        Math.PI / 2,
                        0,
                        0,
                    ]}
                >
                    <torusGeometry
                        args={[
                            0.59,
                            0.042,
                            18,
                            90,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#ffd166"
                        transparent
                        opacity={0.9}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* central goal nucleus */}

                <mesh ref={nucleus}>
                    <sphereGeometry
                        args={[
                            0.48,
                            32,
                            32,
                        ]}
                    />

                    <meshStandardMaterial
                        color="#ff7a18"
                        emissive="#ff3b16"
                        emissiveIntensity={3.2}
                        metalness={0.72}
                        roughness={0.12}
                    />
                </mesh>

                <mesh scale={0.42}>
                    <sphereGeometry
                        args={[0.48, 24, 24]}
                    />

                    <meshBasicMaterial
                        color="#ffe6a3"
                        transparent
                        opacity={0.75}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* goal direction beam */}

                <mesh
                    position={[
                        0,
                        0,
                        1.08,
                    ]}
                >
                    <coneGeometry
                        args={[
                            0.11,
                            0.35,
                            20,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#ffd166"
                        transparent
                        opacity={0.9}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* outer progress rings */}

                <Ring
                    radius={1.55}
                    color="#ff7138"
                    speed={0.28}
                    rotation={[
                        0.4,
                        0.5,
                        0,
                    ]}
                    opacity={0.65}
                />

                <Ring
                    radius={1.78}
                    color="#ffb52f"
                    speed={-0.18}
                    rotation={[
                        0.9,
                        0.1,
                        0.4,
                    ]}
                    opacity={0.35}
                />

                {/* progress signals */}

                <OrbitDot
                    radius={1.55}
                    speed={0.44}
                    color="#ffb52f"
                    offset={0}
                    size={0.045}
                />

                <OrbitDot
                    radius={1.55}
                    speed={0.44}
                    color="#ff6138"
                    offset={2.1}
                    y={0.08}
                    size={0.045}
                />

                <OrbitDot
                    radius={1.55}
                    speed={0.44}
                    color="#ffd166"
                    offset={4.2}
                    y={-0.08}
                    size={0.045}
                />

                <pointLight
                    color="#ff5428"
                    intensity={7}
                    distance={5}
                />

                <pointLight
                    color="#ffc34d"
                    intensity={3}
                    distance={4}
                    position={[
                        1,
                        1,
                        1,
                    ]}
                />

            </group>
        </ParallaxGroup>
    )
}

/* =========================================================
   PLANNER
   CYAN / BLUE HOLOGRAPHIC TIME ENGINE
========================================================= */

function PlannerScene() {
    const system = useRef()

    const nodes = [
        [-1.05, 0.52, 0.1],
        [-0.58, 0.86, 0],
        [0, 0.98, 0.1],
        [0.62, 0.78, 0],
        [1.05, 0.45, 0.1],

        [-0.88, -0.45, 0],
        [-0.38, -0.68, 0.1],
        [0.38, -0.72, 0],
        [0.88, -0.48, 0.1],
    ]

    useFrame((state, delta) => {
        if (!system.current) return

        system.current.rotation.y += delta * 0.07

        system.current.rotation.z =
            Math.sin(
                state.clock.elapsedTime * 0.22
            ) * 0.018
    })

    return (
        <ParallaxGroup intensity={0.18}>
            <group
                ref={system}
                scale={0.62}
            >

                {/* =================================================
                    OUTER HOLOGRAPHIC TIME RINGS
                ================================================= */}

                <Ring
                    radius={1.35}
                    color="#38e8ff"
                    speed={0.28}
                    rotation={[0.55, 0.15, 0]}
                    tube={0.012}
                    opacity={0.42}
                />

                <Ring
                    radius={1.52}
                    color="#8b5cf6"
                    speed={-0.20}
                    rotation={[0.85, 0.35, 0.15]}
                    tube={0.010}
                    opacity={0.30}
                />

                <Ring
                    radius={1.68}
                    color="#ec4899"
                    speed={0.14}
                    rotation={[1.1, 0.2, 0.5]}
                    tube={0.008}
                    opacity={0.20}
                />

                {/* =================================================
                    SMALL CENTRAL CLOCK
                ================================================= */}

                <mesh
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    <torusGeometry
                        args={[
                            0.52,
                            0.018,
                            12,
                            100,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#38e8ff"
                        transparent
                        opacity={0.72}
                        blending={
                            THREE.AdditiveBlending
                        }
                    />
                </mesh>

                {/* =================================================
                    SMALL ENERGY CORE
                    REDUCED FROM OLD LARGE BALL
                ================================================= */}

                <mesh scale={0.10}>
                    <sphereGeometry
                        args={[1, 24, 24]}
                    />

                    <meshBasicMaterial
                        color="#ff7a45"
                        transparent
                        opacity={0.72}
                        blending={
                            THREE.AdditiveBlending
                        }
                    />
                </mesh>

                {/* tiny inner pulse */}

                <mesh scale={0.055}>
                    <sphereGeometry
                        args={[1, 20, 20]}
                    />

                    <meshBasicMaterial
                        color="#ffd166"
                        transparent
                        opacity={0.9}
                        blending={
                            THREE.AdditiveBlending
                        }
                    />
                </mesh>

                {/* =================================================
                    CLOCK HANDS
                ================================================= */}

                <mesh
                    position={[0.18, 0.045, 0]}
                    rotation={[0, 0, -0.55]}
                >
                    <boxGeometry
                        args={[
                            0.38,
                            0.012,
                            0.012,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#67e8f9"
                        transparent
                        opacity={0.82}
                        blending={
                            THREE.AdditiveBlending
                        }
                    />
                </mesh>

                <mesh
                    position={[-0.015, 0.08, 0]}
                    rotation={[0, 0, 1.25]}
                >
                    <boxGeometry
                        args={[
                            0.27,
                            0.010,
                            0.010,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#f472b6"
                        transparent
                        opacity={0.86}
                        blending={
                            THREE.AdditiveBlending
                        }
                    />
                </mesh>

                {/* =================================================
                    COLOURFUL SCHEDULE NODES
                ================================================= */}

                {nodes.map(
                    (position, index) => (
                        <DataNode
                            key={index}
                            position={position}
                            color={
                                index % 5 === 0
                                    ? '#38e8ff'
                                    : index % 5 === 1
                                        ? '#8b5cf6'
                                        : index % 5 === 2
                                            ? '#ec4899'
                                            : index % 5 === 3
                                                ? '#ff8a45'
                                                : '#ffd166'
                            }
                            scale={
                                index === 2 ||
                                    index === 7
                                    ? 0.75
                                    : 0.48
                            }
                            speed={
                                0.8 +
                                index * 0.06
                            }
                        />
                    )
                )}

                {/* =================================================
                    SMALL ORBIT SIGNALS
                ================================================= */}

                <OrbitDot
                    radius={1.32}
                    speed={0.38}
                    color="#38e8ff"
                    offset={0}
                    size={0.035}
                />

                <OrbitDot
                    radius={1.50}
                    speed={-0.24}
                    color="#ff7a45"
                    offset={2.3}
                    y={0.08}
                    size={0.032}
                />

                <OrbitDot
                    radius={1.65}
                    speed={0.18}
                    color="#f472b6"
                    offset={4.2}
                    y={-0.06}
                    size={0.028}
                />

                {/* =================================================
                    LOCAL MULTICOLOUR LIGHT
                ================================================= */}

                <pointLight
                    color="#38e8ff"
                    intensity={3.2}
                    distance={3.5}
                />

                <pointLight
                    color="#8b5cf6"
                    intensity={2.2}
                    distance={3}
                    position={[-0.8, 0.7, 0.5]}
                />

                <pointLight
                    color="#ff5b36"
                    intensity={1.8}
                    distance={3}
                    position={[0.8, -0.5, 0.5]}
                />

                <pointLight
                    color="#ec4899"
                    intensity={1.3}
                    distance={2.8}
                    position={[0.3, 0.8, 0.3]}
                />

            </group>
        </ParallaxGroup>
    )
}
/* =========================================================
   FINANCE
   EMERALD / GOLD MARKET GROWTH SYSTEM
========================================================= */

function FinanceScene() {
    const market = useRef()
    const signal = useRef()

    const bars = [
        { x: -1.5, h: 0.55 },
        { x: -1.0, h: 0.82 },
        { x: -0.5, h: 0.68 },
        { x: 0, h: 1.12 },
        { x: 0.5, h: 1.35 },
        { x: 1.0, h: 1.62 },
        { x: 1.5, h: 1.95 },
    ]

    useFrame((state, delta) => {
        if (!market.current) return

        market.current.rotation.y +=
            delta * 0.055

        market.current.rotation.x =
            Math.sin(
                state.clock.elapsedTime * 0.22
            ) * 0.022

        if (signal.current) {
            signal.current.position.y =
                Math.sin(
                    state.clock.elapsedTime * 2
                ) * 0.04
        }
    })

    return (
        <ParallaxGroup intensity={0.18}>
            <group ref={market}>

                {/* financial bars */}

                {bars.map((bar, index) => (
                    <Float
                        key={index}
                        speed={
                            1 +
                            index * 0.05
                        }
                        floatIntensity={0.055}
                    >
                        <mesh
                            position={[
                                bar.x,
                                bar.h / 2 - 0.9,
                                0,
                            ]}
                        >
                            <boxGeometry
                                args={[
                                    0.24,
                                    bar.h,
                                    0.24,
                                ]}
                            />

                            <meshStandardMaterial
                                color={
                                    index ===
                                        bars.length - 1
                                        ? '#9affd3'
                                        : '#25d99a'
                                }
                                emissive={
                                    index ===
                                        bars.length - 1
                                        ? '#28f5a5'
                                        : '#0abf78'
                                }
                                emissiveIntensity={
                                    1.7 +
                                    index * 0.09
                                }
                                metalness={0.78}
                                roughness={0.14}
                            />
                        </mesh>
                    </Float>
                ))}

                {/* gold top signal */}

                <mesh
                    ref={signal}
                    position={[
                        1.5,
                        1.15,
                        0.15,
                    ]}
                >
                    <sphereGeometry
                        args={[
                            0.075,
                            18,
                            18,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#ffd166"
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* market floor */}

                <mesh
                    position={[
                        0,
                        -0.92,
                        0,
                    ]}
                >
                    <boxGeometry
                        args={[
                            3.7,
                            0.022,
                            0.72,
                        ]}
                    />

                    <meshBasicMaterial
                        color="#18d996"
                        transparent
                        opacity={0.32}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* growth rings */}

                <Ring
                    radius={1.62}
                    color="#20e5a0"
                    speed={0.26}
                    rotation={[
                        0.5,
                        0.4,
                        0,
                    ]}
                    opacity={0.62}
                />

                <Ring
                    radius={1.88}
                    color="#ffd166"
                    speed={-0.15}
                    rotation={[
                        1,
                        0.3,
                        0.6,
                    ]}
                    opacity={0.28}
                />

                {/* upward growth nodes */}

                <DataNode
                    position={[
                        -1.35,
                        0.1,
                        0.25,
                    ]}
                    color="#34d399"
                    scale={0.58}
                />

                <DataNode
                    position={[
                        -0.58,
                        0.45,
                        0.15,
                    ]}
                    color="#6ee7b7"
                    scale={0.65}
                />

                <DataNode
                    position={[
                        0.25,
                        0.78,
                        0.2,
                    ]}
                    color="#34e7a1"
                    scale={0.76}
                />

                <DataNode
                    position={[
                        1.15,
                        1.28,
                        0.1,
                    ]}
                    color="#ffd166"
                    scale={0.82}
                />

                {/* market signal */}

                <OrbitDot
                    radius={1.68}
                    speed={0.34}
                    color="#4adea5"
                    offset={0}
                    size={0.042}
                />

                <OrbitDot
                    radius={1.9}
                    speed={-0.22}
                    color="#ffd166"
                    offset={2.4}
                    y={0.08}
                    size={0.036}
                />

                <pointLight
                    color="#20e5a0"
                    intensity={8}
                    distance={5}
                />

                <pointLight
                    color="#ffd166"
                    intensity={2.8}
                    distance={4}
                    position={[
                        1,
                        1,
                        1,
                    ]}
                />

                <pointLight
                    color="#22d3ee"
                    intensity={1.2}
                    distance={3}
                    position={[
                        -1,
                        -0.5,
                        1,
                    ]}
                />

            </group>
        </ParallaxGroup>
    )
}

/* =========================================================
   BACKGROUND DATA FIELD
========================================================= */

function BackgroundField() {
    const group = useRef()

    useFrame((state, delta) => {
        if (!group.current) return

        group.current.rotation.y +=
            delta * 0.018

        group.current.rotation.x =
            Math.sin(
                state.clock.elapsedTime * 0.12
            ) * 0.018
    })

    const nodes = [
        [-2.8, 1.5, -1],
        [2.7, 1.1, -0.8],
        [-2.5, -1.3, -0.5],
        [2.6, -1.5, -1],
        [-1.8, 2.0, -1.5],
        [1.7, 1.9, -1.2],
        [-1.9, -2, -1],
        [1.9, -2, -1.4],
    ]

    return (
        <group ref={group}>
            {nodes.map(
                (position, index) => (
                    <DataNode
                        key={index}
                        position={position}
                        color={
                            index % 2 === 0
                                ? '#7568ff'
                                : '#32dfff'
                        }
                        scale={0.45}
                        speed={
                            0.7 +
                            index * 0.08
                        }
                    />
                )
            )}
        </group>
    )
}

/* =========================================================
   SCENE SWITCHER
========================================================= */

function Scene({ mode }) {
    return (
        <>
            <ambientLight intensity={0.18} />

            {mode === 'AI Assistant' && (
                <AIScene />
            )}

            {mode === 'Goals' && (
                <GoalsScene />
            )}

            {mode === 'Planner' && (
                <PlannerScene />
            )}

            {mode === 'Finance' && (
                <FinanceScene />
            )}

            {mode === 'Overview' && (
                <OverviewScene />
            )}

            {/* Always-moving background */}

            <BackgroundField />

            {/* Atmospheric particles */}

            <Sparkles
                count={180}
                scale={7}
                size={2}
                speed={0.32}
                noise={1.2}
                color="#8c7dff"
            />

            <Sparkles
                count={70}
                scale={6}
                size={2.4}
                speed={0.55}
                noise={0.9}
                color="#35ddff"
            />

            <Sparkles
                count={35}
                scale={5}
                size={2}
                speed={0.42}
                noise={0.7}
                color="#ff5bc8"
            />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping
                dampingFactor={0.06}
                autoRotate
                autoRotateSpeed={0.16}
            />
        </>
    )
}

/* =========================================================
   CANVAS
========================================================= */

export default function LifeCore3D({
    mode = 'Overview',
}) {
    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 42,
            }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: true,
            }}
        >
            <Scene mode={mode} />
        </Canvas>
    )
}