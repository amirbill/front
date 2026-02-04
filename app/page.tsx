import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PriceCards from '@/components/PriceCards';
import ProductShowcase from '@/components/ProductShowcase';
import { GroceryPriceSection } from '@/components/grocery-price-section';
import { SmartInfoCard } from '@/components/smart-info-card';
import { SupermarketEssentials } from '@/components/SupermarketEssentials';
import { ParaProductShowcase } from '@/components/ParaProductShowcase';
import { FakePriceAlerts } from '@/components/FakePriceAlerts';
import { PriceIncreasePrediction } from '@/components/PriceIncreasePrediction';
import { ShopPriceComparisonTable } from '@/components/ShopPriceComparisonTable';

// Category configurations for each showcase
const imprimanteCategories = [
  { id: "Imprimante", label: "Imprimante", type: "low_category" as const },
  { id: "PC de Bureau", label: "PC de Bureau", type: "subcategory" as const },
  { id: "Pc Portable", label: "Pc Portable", type: "subcategory" as const },
  { id: "Refrigerateur", label: "Réfrigérateur", type: "subcategory" as const },
  { id: "Machine à Laver", label: "Machine à Laver", type: "subcategory" as const },
  { id: "Lave Vaisselle", label: "Lave Vaisselle", type: "subcategory" as const },
];

const refrigerateurCategories = [
  { id: "Refrigerateur", label: "Réfrigérateur", type: "subcategory" as const },
  { id: "PC de Bureau", label: "PC de Bureau", type: "subcategory" as const },
  { id: "Pc Portable", label: "Pc Portable", type: "subcategory" as const },
  { id: "Imprimante", label: "Imprimante", type: "low_category" as const },
  { id: "Machine à Laver", label: "Machine à Laver", type: "subcategory" as const },
  { id: "Lave Vaisselle", label: "Lave Vaisselle", type: "subcategory" as const },
];

const machineALaverCategories = [
  { id: "Machine à Laver", label: "Machine à Laver", type: "subcategory" as const },
  { id: "PC de Bureau", label: "PC de Bureau", type: "subcategory" as const },
  { id: "Pc Portable", label: "Pc Portable", type: "subcategory" as const },
  { id: "Imprimante", label: "Imprimante", type: "low_category" as const },
  { id: "Refrigerateur", label: "Réfrigérateur", type: "subcategory" as const },
  { id: "Lave Vaisselle", label: "Lave Vaisselle", type: "subcategory" as const },
];

const laveVaisselleCategories = [
  { id: "Lave Vaisselle", label: "Lave Vaisselle", type: "subcategory" as const },
  { id: "PC de Bureau", label: "PC de Bureau", type: "subcategory" as const },
  { id: "Pc Portable", label: "Pc Portable", type: "subcategory" as const },
  { id: "Imprimante", label: "Imprimante", type: "low_category" as const },
  { id: "Refrigerateur", label: "Réfrigérateur", type: "subcategory" as const },
  { id: "Machine à Laver", label: "Machine à Laver", type: "subcategory" as const },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow flex flex-col gap-8">

        <div className="max-w-7xl mx-auto w-full px-4">
          <HeroSection />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <SmartInfoCard
              videoSrc="/videos/3318080-hd_1920_1080_25fps.mp4"
            />
            <SmartInfoCard
              videoSrc="/videos/5585939-hd_1920_1080_25fps.mp4"
            />
            <SmartInfoCard
              videoSrc="/videos/7579561-uhd_2160_4096_25fps.mp4"
            />
          </div>

          <PriceCards />

          {/* Category Price Comparison Tables */}
          <div className="mt-12 space-y-8">
            <ShopPriceComparisonTable
              type="products"
              title="Prix moyen par chaque catégorie - E-commerce"
              accentColor="purple"
            />
            <ShopPriceComparisonTable
              type="para"
              title="Prix moyen par chaque catégorie - Parapharmacie"
              accentColor="teal"
            />
          </div>

          <ProductShowcase
            defaultCategory="Imprimante"
            categoryType="low_category"
            categories={imprimanteCategories}
            bannerImage="/images/imprimente.png"
            bannerText="Imprimantes"
          />
          <ProductShowcase
            defaultCategory="Refrigerateur"
            categoryType="subcategory"
            categories={refrigerateurCategories}
            bannerImage="/images/electromenager.png"
            bannerText="Électroménager"
          />
          <ProductShowcase
            defaultCategory="Machine à Laver"
            categoryType="subcategory"
            categories={machineALaverCategories}
            bannerImage="/images/lavage.png"
            bannerText="Lavage"
          />
          <ProductShowcase
            defaultCategory="Lave Vaisselle"
            categoryType="subcategory"
            categories={laveVaisselleCategories}
            bannerImage="/images/cuisine.png"
            bannerText="Cuisine"
          />

          {/* Supermarket Essentials Section */}
          <SupermarketEssentials />

          {/* Parapharmacie Section */}
          <div className="max-w-7xl mx-auto w-full px-4 pt-12">
            <h2 className="text-3xl md:text-5xl font-black text-[#0D9488] tracking-tight">
              Parapharmacie: <span className="text-[#111827]">Comparez les Prix</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Trouvez les meilleurs prix parmi Parashop, Pharma Shop et Parafendri
            </p>
          </div>

          <ParaProductShowcase
            defaultCategory="Maman et bébé"
            categoryType="top"
            bannerText="Maman & Bébé"
          />
          <ParaProductShowcase
            defaultCategory="Solaire"
            categoryType="top"
            bannerText="Solaire"
          />
          <ParaProductShowcase
            defaultCategory="Hygiène"
            categoryType="top"
            bannerText="Hygiène"
          />
          <ParaProductShowcase
            defaultCategory="Visage"
            categoryType="low"
            bannerText="Soins Visage"
          />

          <div className="max-w-7xl mx-auto w-full px-4">
            <FakePriceAlerts />
            <PriceIncreasePrediction />
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}
