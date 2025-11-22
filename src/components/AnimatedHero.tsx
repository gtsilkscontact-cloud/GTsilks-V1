'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import IndiaMap from './IndiaMap'
import Button from './ui/Button'
import { stateData } from '@/data/sareeStateData'
import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function AnimatedHero() {
    const [showMap, setShowMap] = useState(false)
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [hasSeenAnimation, setHasSeenAnimation] = useState(false)
    const [mapData, setMapData] = useState<any[]>([])

    // Fetch map states from database
    useEffect(() => {
        const fetchMapData = async () => {
            const supabase = createClient()
            const { data, error } = await supabase.from('map_states').select('*')
            if (data) {
                console.log('📊 Fetched map data from database:', data)
                console.log('📊 Available states in DB:', data.map(s => `${s.name} (${s.state_code})`))
                setMapData(data)
            }
            if (error) {
                console.error('❌ Error fetching map data:', error)
            }
        }
        fetchMapData()
    }, [])

    // Check if user has seen the animation before
    useEffect(() => {
        const seen = localStorage.getItem('hasSeenCurtainAnimation')
        if (seen === 'true') {
            setHasSeenAnimation(true)
            setShowMap(true)
        }
    }, [])

    // Animation for the curtain reveal (only if not seen before)
    useEffect(() => {
        if (!hasSeenAnimation) {
            const timer = setTimeout(() => {
                setShowMap(true)
                localStorage.setItem('hasSeenCurtainAnimation', 'true')
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [hasSeenAnimation])

    // Merge database data with local fallback data
    const currentInfo = selectedState ? (() => {
        console.log(`🖱️ Clicked state: "${selectedState}"`)

        // Try to find by name in database (map sends full state name)
        const dbData = mapData.find(s => s.name === selectedState)
        const localData = stateData[selectedState]

        if (dbData) {
            // Use database data
            const hasKeyFacts = dbData.key_facts && dbData.key_facts.length > 0
            console.log(`📍 ${selectedState} - Data source: DATABASE`, {
                hasKeyFacts,
                keyFactsCount: dbData.key_facts?.length || 0,
                usingFallback: !hasKeyFacts && localData?.points ? 'YES (using local points)' : 'NO'
            })
            return {
                name: dbData.name,
                saree: dbData.saree_type,
                points: dbData.key_facts || localData?.points || [],
                link: dbData.shop_link || `/sarees?state=${encodeURIComponent(dbData.name)}`
            }
        }

        // Fallback to local data
        if (localData) {
            console.log(`📍 ${selectedState} - Data source: LOCAL FALLBACK`)
            return localData
        }

        console.log(`📍 ${selectedState} - Data source: NONE (not found)`)
        return null
    })() : null

    return (
        <section className="relative w-full min-h-[800px] bg-cream-50 overflow-hidden flex flex-col items-center justify-center mb-16">
            <AnimatePresence>
                {!showMap && !hasSeenAnimation && (
                    <motion.div
                        className="absolute inset-0 z-50 flex"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                    >
                        <motion.div
                            className="w-1/2 h-full bg-maroon-900 flex items-center justify-end pr-4 border-r border-gold-500/30"
                            initial={{ x: 0 }}
                            exit={{ x: '-100%', transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-gold-100 text-4xl md:text-6xl font-serif font-bold tracking-wider"
                            >
                                GT
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="w-1/2 h-full bg-maroon-800 flex items-center justify-start pl-4 border-l border-gold-500/30"
                            initial={{ x: 0 }}
                            exit={{ x: '100%', transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-gold-100 text-4xl md:text-6xl font-serif font-bold tracking-wider"
                            >
                                Silks
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10 h-full flex flex-col md:flex-row items-center gap-12">
                {/* Left Side - Map */}
                <motion.div
                    className="w-full md:w-1/2 h-[500px] md:h-[600px] relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: showMap ? 1 : 0, scale: showMap ? 1 : 0.9 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <IndiaMap
                        onStateClick={setSelectedState}
                    />
                </motion.div>

                {/* Right Side - Content */}
                <motion.div
                    className="w-full md:w-1/2 flex flex-col justify-center space-y-8 min-h-[400px]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: showMap ? 1 : 0, x: showMap ? 0 : 20 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    {currentInfo ? (
                        <div className="space-y-6 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-gold-100 shadow-sm">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon-900 mb-2">
                                    {currentInfo.name}
                                </h2>
                                <h3 className="text-2xl text-orange-600 font-medium font-serif">
                                    {currentInfo.saree}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-maroon-800 font-semibold text-lg">
                                    <Info className="w-5 h-5" />
                                    <span>Key Facts</span>
                                </div>
                                <ul className="space-y-3">
                                    {currentInfo.points.map((point: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-700">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                            <span className="leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <Button
                                    href={`/sarees?state=${encodeURIComponent(currentInfo.name)}`}
                                    variant="primary"
                                    size="lg"
                                    className="shadow-lg shadow-orange-200/50"
                                >
                                    Shop {currentInfo.name}
                                </Button>

                                <Link
                                    href={currentInfo.link}
                                    target="_blank"
                                    className="group flex items-center gap-2 text-maroon-700 hover:text-maroon-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-maroon-50"
                                >
                                    <span>Know more</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center md:text-left p-8">
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-maroon-900 leading-tight">
                                India Saree <br />
                                <span className="text-maroon-600">
                                    Heritage
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                Experience the grandeur of handwoven mastery from every corner of India.
                                Click on any highlighted state to explore its unique saree traditions and craftsmanship.
                            </p>
                            <div className="pt-4">
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-maroon-50 text-maroon-800 rounded-full border border-maroon-100">
                                    <Info className="w-5 h-5" />
                                    <span>Interactive Map: Click on states to explore</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
