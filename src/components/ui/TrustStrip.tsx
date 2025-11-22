import { ShieldCheckIcon, TruckIcon, SparklesIcon, GiftIcon } from '@heroicons/react/24/outline'

export default function TrustStrip() {
    const features = [
        {
            name: '100% Authentic Fabrics',
            description: 'Sourced directly from weavers',
            icon: ShieldCheckIcon,
        },
        {
            name: 'Carefully Checked',
            description: 'Quality assured before dispatch',
            icon: SparklesIcon,
        },
        {
            name: 'Secure Packaging',
            description: 'Safe & damage-proof shipping',
            icon: TruckIcon,
        },
        {
            name: 'Blouse Piece Included',
            description: 'With every saree (where mentioned)',
            icon: GiftIcon,
        },
    ]

    return (
        <div className="bg-cream-100 border-y border-gold-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex items-center justify-center text-center lg:text-left lg:justify-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon-100 text-maroon-800">
                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-maroon-900 uppercase tracking-wide">
                                    {feature.name}
                                </h3>
                                <p className="mt-1 text-xs text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
