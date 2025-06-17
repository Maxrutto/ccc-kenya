import { useState, useEffect, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AnimWrapper from '../components/UI/AnimWrapper';
import Loader from '../components/UI/Loader';
import { FaMapMarkerAlt, FaChurch, FaGlobeAfrica } from 'react-icons/fa';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Static data for monasteries in Kenya
const kenyanMonasteries = [
  {
    id: "carmelite-westlands",
    name: "Discalced Carmelite Nuns",
    location: "Westlands (Archdiocese of Nairobi)",
    country: "Kenya",
    image: "images/Carmelite Nairobi Westlands.jpeg",
    coordinates: [-1.2634, 36.8222], // Approximate coordinates
    description: "Our lady of Mt. Carmel monastery Westlands Nairobi"
  },
  {
    id: "carmelite-tindinyo",
    name: "Discalced Carmelite Nuns",
    location: "Tindinyo (Diocese of Eldoret)",
    country: "Kenya",
    image: "images/CARMELITE NUNS - TINDINYO.jpg",
    coordinates: [0.5200, 35.2650], // Adjusted coordinates for Tindinyo area
    description: "Our Lady of Mt. Carmel monastery Tindinyo"
  },
  {
    id: "carmelite-manga",
    name: "Discalced Carmelite Nuns",
    location: "Manga Hills (Diocese of Kisii)",
    country: "Kenya",
    image: "images/Carmelite kisii.jpeg",
    coordinates: [-0.6748, 34.7769], // Approximate coordinates
    description: "Our Lady of Mt. Carmel monastery Kisii"
  },
  {
    id: "carmelite-ancient-machakos",
    name: "Carmelite Nuns of the Ancient Observance",
    location: "Machakos (Diocese of Machakos)",
    country: "Kenya",
    image: "images/Carmelite machakos.jpeg",
    coordinates: [-1.5176, 37.2663], // Approximate coordinates
    description: ""
  },
  {
    id: "carmelite-ancient-juja",
    name: "Carmelite Nuns of the Ancient Observance",
    location: "Juja Farm (Archdiocese of Nairobi)",
    country: "Kenya",
    image: "images/Juja farm discalced Carmelite.jpeg",
    coordinates: [-1.1135, 37.0144], // Approximate coordinates
    description: "Monastery of Mary Mother of God juja farm"
  },
  {
    id: "carmelite-ancient-kitui",
    name: "Carmelite Nuns of the Ancient Observance",
    location: "Kitui (Kitui Diocese)",
    country: "Kenya",
    image: "images/Carmelite Monastery Kitui.jpg",
    coordinates: [-1.3670, 38.0106], // Approximate coordinates
    description: ""
  },
  {
    id: "augustinian-ishiara",
    name: "Augustinian Nuns",
    location: "Ishiara (Diocese of Embu)",
    country: "Kenya",
    image: "images/AUGUSTINIAN CONTEMPLATIVE MONASTERY HOLY TRINITY ISHIARA.jpg",
    coordinates: [-0.4574, 37.7803], // Approximate coordinates
    description: "Holy Trinity monastery Ishihara"
  },
  {
    id: "augustinian-kitale",
    name: "Augustinian Nuns",
    location: "Kitale (Diocese of Kitale)",
    country: "Kenya",
    image: "images/Augustinian Contemplative Nuns in Kitale Diocese, Kaplamai parish.jpg",
    coordinates: [1.0124, 35.0020], // Approximate coordinates
    description: "St. Rita monastery - Kitale"
  },
  {
    id: "augustinian-recollect-wote",
    name: "Augustinian Recollect Nuns",
    location: "Wote (Diocese of Wote)",
    country: "Kenya",
    image: "images/Augustinian Recollect nuns, wote machakos.jpeg",
    coordinates: [-1.7803, 37.6288], // Approximate coordinates
    description: ""
  },
  {
    id: "augustinian-recollect-nakwamekwi",
    name: "Augustinian Recollect Nuns",
    location: "Nakwamekwi (Diocese of Lodwar)",
    country: "Kenya",
    image: "images/Augustinian nuns lodwar.jpeg",
    coordinates: [3.1166, 35.5973], // Approximate coordinates
    description: ""
  },
  {
    id: "dominican-karen",
    name: "Dominican Nuns",
    location: "Karen (Archdiocese of Nairobi)",
    country: "Kenya",
    image: "images/Dominican Nuns Karen.jpeg",
    coordinates: [-1.3132, 36.7064], // Approximate coordinates
    description: "Corpus Christi monastery Karen-Nairobi"
  },
  {
    id: "cottolengo-tuuru",
    name: "Cottolengo Contemplatives",
    location: "Tuuru (Diocese of Meru)",
    country: "Kenya",
    image: "images/Cottolengo.jpeg",
    coordinates: [0.0858, 37.6538], // Approximate coordinates
    description: "Cottolengo monastery of Jesus the Priest"
  },
  {
    id: "perpetual-adorers-karima",
    name: "Perpetual Adorers of the Blessed Sacrament",
    location: "Karima (Archdiocese of Nyeri)",
    country: "Kenya",
    image: "images/Karima Monastery, Othaya.jpg",
    coordinates: [-0.4167, 36.9500], // Approximate coordinates
    description: "Karima Monastery Othaya - Nyeri"
  },
  {
    id: "perpetual-adorers-isiolo",
    name: "Perpetual Adorers of the Blessed Sacrament",
    location: "Isiolo (Diocese of Isiolo)",
    country: "Kenya",
    image: "images/Isiolo... Perpetual adorers.jpeg",
    coordinates: [0.3550, 37.5829], // Approximate coordinates
    description: "PERPETUAL ADORERS OF THE BLESSED SACRAMENT. ISIOLO MONASTERY"
  },
  {
    id: "poor-clare-myanga",
    name: "Poor Clare Nuns",
    location: "Myanga (Diocese of Bungoma)",
    country: "Kenya",
    image: "images/MONASTERY OF OUR LADY OF LIGHT, MYANGA - BUNGOMA - KENYA.jpg",
    coordinates: [0.5708, 34.5606], // Approximate coordinates
    description: "Our lady of Light Poor Clare monastery Myanga"
  },
  {
    id: "poor-clare-colettine-mpeketoni",
    name: "Poor Clare Colettine Nuns",
    location: "Mpeketoni (Diocese of Malindi)",
    country: "Kenya",
    image: "images/POOR CLARES COLETTINESS (MPEKETONI-MALINDI DIOCESE –KENYA.jpg",
    coordinates: [-2.4003, 40.6861], // Approximate coordinates
    description: "Our Lady of Fatima Monastery Mpeketoni"
  },
  {
    id: "good-shepherd-ngong",
    name: "Sisters of the Good Shepherd Contemplatives",
    location: "Ngong (Diocese of Ngong)",
    country: "Kenya",
    image: "images/Good Shepherd Ngong North kajiado county.jpg",
    coordinates: [-1.3603, 36.6700], // Approximate coordinates
    description: ""
  },
  {
    id: "mercedarian-mwatate",
    name: "Discalced Mercedarian Nuns",
    location: "Mwatate (Archdiocese of Mombasa)",
    country: "Kenya",
    image: "images/macederian mwatate.jpeg",
    coordinates: [-3.5050, 38.3872], // Approximate coordinates
    description: ""
  },
  {
    id: "benedictine-kiambu",
    name: "Benedictine Nuns",
    location: "Kiambu (Archdiocese of Nairobi)",
    country: "Kenya",
    image: "images/Kiambu.jpeg",
    coordinates: [-1.1694, 36.8290], // Approximate coordinates
    description: ""
  },
  {
    id: "benedictine-muhoroni",
    name: "Benedctine Nuns - Tamu",
    location: "Muhoroni (Archdiocese of Kisumu)",
    country: "Kenya",
    image: "images/Benedictine Tamu,kisumu.jpeg",
    coordinates: [-0.1540, 35.2073], // Approximate coordinates
    description: "Immaculate conception monastery Tamu"
  },
  {
    id: "holy-spirit-nairobi",
    name: "Order of the Holy Spirit [Comendadoras]",
    location: "Resurrection Garden (Archdiocese of Nairobi)",
    country: "Kenya",
    image: "images/Karen.jpeg",
    coordinates: [-1.2921, 36.8219], // Approximate coordinates
    description: "Sacred heart monastery, resurrection garden Nairobi"
  },
  {
    id: "contemplative-small-hosts-eldoret",
    name: "Contemplative Small Hosts",
    location: "Eldoret (Diocese of Eldoret)",
    country: "Kenya",
    image: "images/placeholder.jpeg",
    coordinates: [0.5100, 35.2750], // Adjusted coordinates for Eldoret area
    description: "New foundation in Eldoret Diocese - canonical status pending"
  }
];

// Static data for monasteries in other countries
const otherCountriesMonasteries = [
  {
    id: "carmelite-zomba-malawi",
    name: "Discalced Carmelite Nuns",
    location: "Zomba (Diocese of Zomba)",
    country: "Malawi",
    image: "images/Discalced Carmelite Nuns of the Holy Family Monastery zomba malawi.jpg",
    coordinates: [-15.3833, 35.3333], // Approximate coordinates
    description: "Holy family monastery Zomba, Malawi"
  },
  {
    id: "carmelite-mafikeng-southafrica",
    name: "Discalced Carmelite Nuns",
    location: "Mafikeng (Diocese of Kimbereley)",
    country: "South Africa",
    image: "images/Mafikeng.jpeg",
    coordinates: [-25.8560, 25.6403], // Approximate coordinates
    description: ""
  },
  {
    id: "carmelite-weirmouth-zimbabwe",
    name: "Discalced Carmelite Nuns",
    location: "Weirmouth (Diocese of Mutare)",
    country: "Zimbabwe",
    image: "images/Mutare.jpeg",
    coordinates: [-18.9716, 32.6467], // Approximate coordinates
    description: "Monastery of the Holy Family Mutare"
  },
  {
    id: "dominican-kabwe-zambia",
    name: "Dominican Nuns",
    location: "Kabwe (Diocese of Kabwe)",
    country: "Zambia",
    image: "images/Kabwe.jpeg",
    coordinates: [-14.4469, 28.4464], // Approximate coordinates
    description: "Divine Mercy monastery Zambia"
  },
  {
    id: "capuchin-maua-tanzania",
    name: "Capuchin Nuns (TOR)",
    location: "Maua",
    country: "Tanzania",
    image: "images/Capuchin Tanzania.jpeg",
    coordinates: [-3.5756, 37.3419], // Approximate coordinates
    description: "Mary Mother of God Monastery, Maua (Tanzania)"
  },
  {
    id: "benedictine-tororo-uganda",
    name: "Benedictine Nuns of Perpetual Adoration",
    location: "Tororo",
    country: "Uganda",
    image: "images/Benedictine Nuns of Perpetual Adoration tororo Uganda.jpg",
    coordinates: [0.6925, 34.1814], // Approximate coordinates
    description: "St. Benedicts Priory monastery Tororo"
  },
  {
    id: "poor-clare-harare-zimbabwe",
    name: "Poor Clare Nuns",
    location: "Harare",
    country: "Zimbabwe",
    image: "images/Poor Clare's harare Zimbabwe.jpeg",
    coordinates: [-17.8292, 31.0522], // Approximate coordinates
    description: "St. Clare's monastery Harare"
  },
  {
    id: "poor-clare-colettine-bukoba-tanzania",
    name: "Poor Clare Colettine Nuns",
    location: "Bukoba",
    country: "Tanzania",
    image: "images/POOR CLARES COLETTINESS CONGREGATION (BUKOBA DIOCESE- TANZANIA E.A).jpg",
    coordinates: [-1.3317, 31.8162], // Approximate coordinates
    description: ""
  },
  {
    id: "carmelite-bunda-tanzania",
    name: "Discalced Carmelite Nuns",
    location: "Bunda",
    country: "Tanzania",
    image: "images/The Cloistered Carmelite Monastery bunda tanzania.jpg",
    coordinates: [-2.0024, 33.8346], // Approximate coordinates
    description: "Our Lady of Mt. Carmel monastery -Bunda Tanzania"
  },
  {
    id: "capuchin-poor-clare-melville-southafrica",
    name: "Capuchin Poor Clare Nuns",
    location: "Melvile",
    country: "South Africa",
    image: "images/Capuchin Poor Clare Sisters.jpeg",
    coordinates: [-26.1771, 28.0037], // Approximate coordinates
    description: "Our Lady of the Blessed Sacrament Monastery, Melvile (South Africa)"
  },
  {
    id: "dominican-fortportal-uganda",
    name: "Dominican Nuns",
    location: "Fort Portal - Monastery of the Queen of the Most Holy Rosary",
    country: "Uganda",
    image: "images/Fortportal Dominican nuns Uganda.jpeg",
    coordinates: [0.6682, 30.2794], // Approximate coordinates
    description: ""
  },
  {
    id: "holy-spirit-lome-togo",
    name: "Servants of the Holy Spirit of Perpetual Adoration Nuns",
    location: "Lome",
    country: "Togo",
    image: "images/Order of the Holy Spirit [Comendadoras].jpg",
    coordinates: [6.1375, 1.2123], // Approximate coordinates
    description: ""
  },
  {
    id: "poor-clare-mbarara-uganda",
    name: "Poor Clare Nuns",
    location: "Mbarara - Monastery of the Holy Church",
    country: "Uganda",
    image: "images/Poor Clare's mbarara.jpeg",
    coordinates: [-0.6166, 30.6549], // Approximate coordinates
    description: "Monastery of the Holy Church Mbarara Uganda."
  },
  {
    id: "dominican-bamenda-cameroon",
    name: "Dominican Nuns",
    location: "Bamenda",
    country: "Cameroon",
    image: "images/Dominican Bambui Cameroon.jpeg",
    coordinates: [5.9596, 10.1590], // Approximate coordinates
    description: ""
  },
  {
    id: "dominican-bambui-cameroon",
    name: "Dominican Nuns - Monastery of St. Dominic",
    location: "Bambui, Bamenda",
    country: "Cameroon",
    image: "images/The monastery of St. Dominic Bambui, Bamenda.jpg",
    coordinates: [5.9596, 10.1590], // Approximate coordinates for Bamenda area
    description: "Monastery of St. Dominic Bambui, Bamenda"
  },
  {
    id: "dominican-rweza-burundi",
    name: "Dominican Nuns",
    location: "Rweza - Monastere De la Paix",
    country: "Burundi",
    image: "images/Dominican Burundi.jpeg",
    coordinates: [-3.3731, 29.3776], // Approximate coordinates
    description: "Monastery Notre Dame de la paix Rweza- Burundi"
  },
  {
    id: "dominican-douala-cameroon",
    name: "Dominican Nuns",
    location: "Douala - Monastere St. Dominique et N.D. du Rosaire",
    country: "Cameroon",
    image: "images/Douala.jpeg",
    coordinates: [4.0511, 9.7679], // Approximate coordinates
    description: ""
  },
  {
    id: "dominican-benin",
    name: "Dominican Nuns",
    location: "Cotonou",
    country: "Benin",
    image: "images/Dominican Benin.jpeg",
    coordinates: [6.3676, 2.4252], // Approximate coordinates for Cotonou
    description: "Monastery de I'Annonciation Soclogbo diocese de Dassa- Benin"
  }
];

// Combine all monasteries
const allMonasteries = [...kenyanMonasteries, ...otherCountriesMonasteries];

function Monasteries() {
  const [loading, setLoading] = useState(true);
  const [activeMonastery, setActiveMonastery] = useState(null);
  const [mapError, setMapError] = useState(false);
  const defaultCenter = [0.0236, 37.9062]; // Kenya center
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    // Simulate data loading for consistency
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Handle map loading errors
  const handleMapError = () => {
    console.error("Map failed to load");
    setMapError(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="pt-16 pb-12 w-full overflow-x-hidden">
      <section className="py-10 md:py-20 w-full">
        <div className="container mx-auto px-2 sm:px-4 max-w-full">
          <AnimWrapper>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-6 md:mb-8 text-blue-600">
              Member Monasteries
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto mb-8 md:mb-12 font-['Montserrat']">
              Explore our member monasteries across Kenya and other parts of English-speaking Africa, 
              each contributing their unique charism to our contemplative mission.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={isMobile ? 0.2 : 0.5}>
            {!mapError ? (
              <div className="h-[40vh] md:h-[60vh] mb-10 md:mb-16 rounded-xl overflow-hidden shadow-lg">
                <MapContainer 
                  center={defaultCenter} 
                  zoom={6} 
                  style={{ height: "100%", width: "100%" }}
                  whenReady={() => console.log("Map is ready")}
                  onError={handleMapError}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {allMonasteries.map(monastery => (
                    <Marker 
                      key={monastery.id} 
                      position={monastery.coordinates}
                      eventHandlers={{
                        click: () => {
                          setActiveMonastery(monastery);
                        },
                      }}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-bold">{monastery.name}</h3>
                          <p>{monastery.location}</p>
                          <p className="text-blue-600">{monastery.country}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            ) : (
              <div className="h-[30vh] mb-10 md:mb-16 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <FaMapMarkerAlt className="text-5xl text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Map Unavailable</h3>
                  <p className="text-gray-600">
                    The map couldn't be loaded. Please see the list of monasteries below.
                  </p>
                </div>
              </div>
            )}
          </AnimWrapper>

          {/* Kenya Monasteries Section */}
          <AnimWrapper>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600 flex items-center justify-center">
              <FaChurch className="mr-3 text-blue-500" /> 
              CCCK Monasteries in Kenya
            </h2>
          </AnimWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {kenyanMonasteries.map((monastery, index) => (
              <AnimWrapper key={monastery.id} delay={isMobile ? 0.1 : 0.1 * (index % 6)}>
                <div 
                  className={`card bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${
                    activeMonastery?.id === monastery.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setActiveMonastery(monastery)}
                >
                  <div className="h-48 md:h-56 overflow-hidden">
                    <img 
                      src={monastery.image} 
                      alt={monastery.name}
                      className={`w-full h-full object-cover transition-transform hover:scale-105 duration-500 ${
                        monastery.id === "perpetual-adorers-isiolo" || monastery.id === "perpetual-adorers-karima" ? "object-top" : 
                        monastery.id === "holy-spirit-nairobi" ? "object-top" : 
                        monastery.id === "carmelite-ancient-juja" ? "object-top" : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        console.error(`Failed to load image: ${monastery.image}`);
                        e.target.onerror = null;
                        e.target.src = 'images/placeholder.jpeg';
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-700">{monastery.name}</h3>
                    <div className="flex items-start mb-3">
                      <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{monastery.location}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{monastery.description}</p>
                  </div>
                </div>
              </AnimWrapper>
            ))}
          </div>

          {/* Other Countries Monasteries Section */}
          <AnimWrapper>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600 flex items-center justify-center">
              <FaGlobeAfrica className="mr-3 text-blue-500" /> 
              Other CCCK Monasteries in Anglophone Africa
            </h2>
          </AnimWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherCountriesMonasteries.map((monastery, index) => (
              <AnimWrapper key={monastery.id} delay={isMobile ? 0.1 : 0.1 * (index % 6)}>
                <div 
                  className={`card bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${
                    activeMonastery?.id === monastery.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setActiveMonastery(monastery)}
                >
                  <div className="h-48 md:h-56 overflow-hidden">
                    <img 
                      src={monastery.image} 
                      alt={monastery.name}
                      className={`w-full h-full object-cover transition-transform hover:scale-105 duration-500 ${
                        monastery.id === "perpetual-adorers-isiolo" || monastery.id === "perpetual-adorers-karima" ? "object-top" : 
                        monastery.id === "holy-spirit-nairobi" ? "object-top" : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        console.error(`Failed to load image: ${monastery.image}`);
                        e.target.onerror = null;
                        e.target.src = 'images/placeholder.jpeg';
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-700">{monastery.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{monastery.country}</p>
                    <div className="flex items-start mb-3">
                      <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{monastery.location}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{monastery.description}</p>
                  </div>
                </div>
              </AnimWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(Monasteries);