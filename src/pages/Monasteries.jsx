import { useState, useEffect, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/imageBuilder';
import { PortableText } from '@portabletext/react';
import AnimWrapper from '../components/UI/AnimWrapper';
import Loader from '../components/UI/Loader';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function Monasteries() {
  const [monasteries, setMonasteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMonastery, setActiveMonastery] = useState(null);
  const defaultCenter = [0.0236, 37.9062]; // Kenya center

  useEffect(() => {
    async function fetchMonasteries() {
      try {
        const data = await client.fetch(`
          *[_type == "monastery"] {
            _id,
            name,
            description,
            location,
            address,
            image,
            establishedYear,
            congregationName,
            contactEmail,
            contactPhone,
            website
          }
        `);
        setMonasteries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching monasteries:", error);
        setLoading(false);
      }
    }

    fetchMonasteries();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-playfair text-secondary">
              Member Monasteries
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12">
              Explore our member monasteries across Kenya and other parts of English-speaking Africa, 
              each contributing their unique charism to our contemplative mission.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.7}>
            <div className="h-[50vh] md:h-[60vh] mb-16 rounded-xl overflow-hidden shadow-lg">
              <MapContainer 
                center={defaultCenter} 
                zoom={7} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {monasteries.map(monastery => 
                  monastery.location && (
                    <Marker 
                      key={monastery._id} 
                      position={[monastery.location.lat, monastery.location.lng]}
                      eventHandlers={{
                        click: () => {
                          setActiveMonastery(monastery);
                        },
                      }}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-bold">{monastery.name}</h3>
                          <p>{monastery.address}</p>
                        </div>
                      </Popup>
                    </Marker>
                  )
                )}
              </MapContainer>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.9}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {monasteries.map(monastery => (
                <div 
                  key={monastery._id} 
                  className={`card p-0 overflow-hidden transition-all duration-300 ${
                    activeMonastery?._id === monastery._id ? 'ring-2 ring-secondary' : ''
                  }`}
                  onClick={() => setActiveMonastery(monastery)}
                >
                  {monastery.image && (
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={urlFor(monastery.image).width(600).url()} 
                        alt={monastery.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{monastery.name}</h3>
                    <p className="text-gray-700 mb-3">{monastery.congregationName}</p>
                    <div className="flex items-start mb-3">
                      <FaMapMarkerAlt className="text-secondary mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm">{monastery.address}</p>
                    </div>
                    {monastery.description && (
                      <div className="prose prose-sm mt-4">
                        <PortableText value={monastery.description} />
                      </div>
                    )}
                    <div className="mt-4 text-sm text-gray-600">
                      {monastery.establishedYear && (
                        <p>Established: {monastery.establishedYear}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
}

export default memo(Monasteries);