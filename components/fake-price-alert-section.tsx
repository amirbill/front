import { FakePriceAlertCard } from "./fake-price-alert-card"

export function FakePriceAlertSection() {
    return (
        <section className="relative mt-24 overflow-hidden px-8 py-20">
            {/* Decorative Elements */}
            <div className="absolute -right-12 -top-12 size-64 rounded-full bg-orange-100/20 blur-3xl" />
            <div className="absolute -left-12 -bottom-12 size-64 rounded-full bg-fuchsia-100/20 blur-3xl" />

            <div className="absolute right-12 top-12 flex gap-2">
                <div className="h-16 w-3.5 rotate-12 rounded-full bg-amber-400 opacity-20" />
                <div className="h-16 w-3.5 rotate-12 rounded-full bg-amber-400" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <h2 className="mb-6 text-4xl md:text-6xl font-black text-[#8B5CF6] tracking-tighter italic">
                        Attention aux <span className="text-destructive uppercase not-italic">Prix Mensongers !</span>
                    </h2>
                    <p className="text-base font-medium leading-relaxed text-gray-500">
                        Notre système détecte automatiquement les fausses promotions. Ces
                        marchands gonflent artificiellement le prix initial pour vous faire
                        croire à une grosse réduction. <span className="text-destructive font-bold">Ne vous faites plus avoir !</span>
                    </p>
                </div>

                {/* Staggered Cards Layout */}
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 h-auto md:h-[500px] py-10">
                    {/* Left Card */}
                    <div className="md:absolute md:left-0 md:top-10 md:z-10 md:-rotate-6 transition-transform hover:rotate-0 hover:z-30 duration-500">
                        <FakePriceAlertCard
                            productName="Galaxy S24 Ultra"
                            storeName="MYTEK"
                            productImage="https://images.samsung.com/is/image/samsung/p6pim/tn/2401/gallery/tn-galaxy-s24-s928-sm-s928bztctun-thumb-539304918"
                            announcedPrice="5 999,00 TND"
                            promoPrice="4 299,00 TND"
                            realPrice="4 000,00 TND"
                        />
                    </div>

                    {/* Center Card */}
                    <div className="md:relative md:z-20 md:scale-110 shadow-2xl transition-transform hover:scale-115 duration-500">
                        <FakePriceAlertCard
                            productName="iPhone 15 Pro Max"
                            storeName="FATALES"
                            productImage="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702776"
                            announcedPrice="6 499,00 TND"
                            promoPrice="5 899,00 TND"
                            realPrice="5 900,00 TND"
                        />
                    </div>

                    {/* Right Card */}
                    <div className="md:absolute md:right-0 md:top-20 md:z-10 md:rotate-6 transition-transform hover:rotate-0 hover:z-30 duration-500">
                        <FakePriceAlertCard
                            productName="MacBook Air M3"
                            storeName="TUNISIANET"
                            productImage="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-midnight-select-202403?wid=940&hei=1112&fmt=png-alpha&.v=1707844007358"
                            announcedPrice="4 899,00 TND"
                            promoPrice="4 499,00 TND"
                            realPrice="4 300,00 TND"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
