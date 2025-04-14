import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimWrapper from '../UI/AnimWrapper';

export default function History() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 mt-8" id="history">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <AnimWrapper>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-8 text-center text-blue-600">
              WHY WE CAME TOGETHER?
            </h2>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed font-sans">
              With the encouragement and help of the Holy See, our monasteries chose to come together so that, by
              combined effort, we can truly live our primary common vocation as intercessors before God for the needs of member of the church, as well as those who are outside our Catholic faith. In this synodal journey, we are also able to help each other to achieve more fully the purpose of our respective religious institutes.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 text-center text-blue-600 mt-12">
              THE BIRTH OF CCCK: Sept 2015
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-serif">
              The birth of the Conference of Contemplative Communities of Kenya (CCCK) happened within the context of the Year of Consecrated Life and in harmony with the renewal of the life for women contemplatives which Pope Francis has ushered. Conscious of the need to update the theological education of cloistered nuns, the superiors of nineteen monasteries in Kenya collaborated with a few apostolic religious to develop a curriculum for their sisters. After receiving the permission and encouragement of the Congregation for Institutes of Consecrated Life and Societies of Apostolic Life (CICLSAL), they scheduled a month-long program from 28 September to 23 October 2015 at the Subiaco Retreat Centre in Karen, Nairobi.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.3}>
            <h3 className="text-2xl md:text-3xl font-['Montserrat'] font-semibold mb-5 text-blue-600 mt-10">
              The Need to Start a Nuns` Conference
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans">
              During his visit to Kenya around that period, Cardinal João Braz de Avís, prefect of CICLSAL, invited these prioresses and their collaborators to dialogue with him on 22 September so he could directly know from them the state of women contemplatives in Africa. On realizing that their common concerns extend beyond theological updating to include religious and human formation, leadership and financial management training, and infrastructural and sustainability problems, he encouraged them to form themselves into a conference of major superiors.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.4}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-5 text-blue-600 mt-10 font-cursive">
              Sept 2016: Nuns From Other Countries Join CCCK
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-serif">
              After a year of dialoguing among themselves, their respective monastic chapters, as well as the desire to comply with the recently promulgated Apostolic Constitution Vultum Dei Quaerere, these major superiors unanimously voted to accept the prefect's proposal in their October 2016 assembly.
              The Holy See accepted their decision and asked them to develop its proper law. Meanwhile, monasteries from Tanzania, Uganda, Zambia, South Africa, and Malawi received the Holy See's permission to participate in the 2016 theological program for nuns in Kenya to ensure the on-going formation of their own sisters. Eventually, this annual school for nuns became known as Venite Seorsum Theology program.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.5}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-5 text-blue-600 mt-10 font-mono">
              Oct. 2017: Pontifical Approval of CCCK Statutes & Election of the Officials
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed font-sans">
              The success and fruitfulness of the 2016 programs led other monasteries from Cameroon, Nigeria, and Zimbabwe to participate in both the 2017 Venite Seorsum Progrma and the assembly of the prioresses. In the presence of Fr. Stefano Cañuto, senior official of the CICLSAL section for monastic life, the assembled superiors finalized the confection of the statutes of CCCK on 6 October 2017. On that same day, the Kenyan prioresses elected and nominated the first officials of the conference. The following 26 October, CICLSAL issued a decree approving the aforementioned statutes. By this act, the Holy See effectively erected CCCK as a juridic persons under its direction (can. 709).
            </p>
          </AnimWrapper>
        </motion.div>
      </div>
    </section>
  );
} 