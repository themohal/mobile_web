import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-teal-600 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Find the Best Tech Prices in{' '}
            <span className="text-teal-300">Pakistan</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Compare prices for mobile phones, tablets, laptops and accessories.
            Get the best deals from trusted sellers.
          </p>

          {/* Search Bar */}
          <SearchBar variant="hero" />
        </div>
      </div>
    </section>
  );
}
