import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Share2, Layout, Sparkles } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Capturez. Partagez.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Inspirez.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Une nouvelle façon de partager vos moments précieux avec le monde.
              Créez des albums, ajoutez des filtres et interagissez avec une communauté passionnée.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Commencer maintenant
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<Camera className="w-8 h-8 text-purple-600" />}
              title="Albums Intelligents"
              description="Organisez vos photos dans des albums thématiques avec une interface intuitive."
            />
            <Feature
              icon={<Sparkles className="w-8 h-8 text-purple-600" />}
              title="Filtres Artistiques"
              description="Transformez vos photos avec notre collection de filtres professionnels."
            />
            <Feature
              icon={<Heart className="w-8 h-8 text-purple-600" />}
              title="Réactions Expressives"
              description="Interagissez avec les photos grâce aux réactions emoji personnalisées."
            />
            <Feature
              icon={<Layout className="w-8 h-8 text-purple-600" />}
              title="Disposition Dynamique"
              description="Affichez vos photos dans une grille responsive et esthétique."
            />
            <Feature
              icon={<Share2 className="w-8 h-8 text-purple-600" />}
              title="Partage Facile"
              description="Partagez vos albums et photos préférés en un seul clic."
            />
            <Feature
              icon={<Users className="w-8 h-8 text-purple-600" />}
              title="Communauté Active"
              description="Rejoignez une communauté de passionnés de photographie."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Prêt à partager vos moments ?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Créer mon compte gratuitement
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Produit</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Fonctionnalités</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Tarifs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">À propos</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Emplois</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Guides</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Confidentialité</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">CGU</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2024 PhotoGallery. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-gray-50 rounded-xl"
    >
      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}