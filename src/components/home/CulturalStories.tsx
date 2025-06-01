
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/layout/Container';

const stories = [
  {
    id: 1,
    title: 'The Art of Traditional Weaving',
    excerpt: 'Discover how ancient techniques are passed down through generations in the communities of Chocó.',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=2070&auto=format&fit=crop',
    slug: 'traditional-weaving'
  },
  {
    id: 2,
    title: 'Stories from the Pacific Coast',
    excerpt: 'Meet the artisans who keep ancestral traditions alive while creating contemporary masterpieces.',
    image: 'https://images.unsplash.com/photo-1493244040629-496f6d136e28?q=80&w=2070&auto=format&fit=crop',
    slug: 'pacific-coast-stories'
  },
  {
    id: 3,
    title: 'Sustainable Craftsmanship',
    excerpt: 'Learn about the eco-friendly practices that make our products both beautiful and responsible.',
    image: 'https://images.unsplash.com/photo-1589128777148-a954bbcad65a?q=80&w=2070&auto=format&fit=crop',
    slug: 'sustainable-craftsmanship'
  }
];

const CulturalStories: React.FC = () => {
  return (
    <section className="py-16 bg-[#f0f5f3]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111816] mb-4">
            Cultural Stories
          </h2>
          <p className="text-lg text-[#608a7c] max-w-2xl mx-auto">
            Immerse yourself in the rich heritage and traditions behind every handcrafted piece
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article key={story.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#111816] mb-3">
                  {story.title}
                </h3>
                <p className="text-[#608a7c] mb-4 leading-relaxed">
                  {story.excerpt}
                </p>
                <Link
                  to={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 text-[#0cf2a5] font-medium hover:gap-3 transition-all duration-200"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/stories"
            className="btn-modern inline-flex items-center gap-2"
          >
            View All Stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CulturalStories;
