import Image from 'next/image';

// Styles
import styles from '../styles/Blog.module.css';

import {
  FcRules,
  FcVoicePresentation,
  FcCalendar
} from "react-icons/fc";

// Components
function User({name}){
  return <div className={styles.user}>
    <div className={styles.photo}>F</div>
    <div className={styles.name}>{name}</div>
  </div>
}


function Post({data}){
  const {title, user, timeStamp, description, urlBlank, images, comments} = data;
  return <div className={styles.post}>
    <div className={styles.title}>
      <h5>{title} <br /><span className={styles.name}>{user} · {timeStamp} · <FcVoicePresentation size="18" /></span></h5>
      <p>{description}</p>
    </div>
    <div className={styles.layoutImages}>
      {
        images.map(({url}, key) => {
          return <img key={key} src={url} alt="" width="100%" />
        })
      }
    </div>
    <div className={styles.titleComments}>
      <div className={styles.likes}></div>
      <div className={styles.countComments}>4 comentarios</div>
    </div>
    <div className={styles.listComments}>
      {
        comments.map((comment, key) => {
          return <div className={styles.comments} key={key}>
            <div className={styles.comment}>
              <div className={styles.user}>F</div>
              <div className={styles.text}>
                <p className={styles.name}>{comment?.user}</p>
                {comment?.comment}
              </div>
            </div>
            <div className={styles.time}>{comment?.timeStamp}</div>
          </div>
        })
      }
    </div>
  </div>
}

// TODO: Constantes que se obtienen de tabla de posts
const POSTS = [
  {
    title: 'covid-19: vacunas y tratamientos',
    user: 'Fernando Robles',
    timeStamp: '20 de Julio de 2022',
    description: 'Estatus de las aprobaciones de covid-19 y de candidatos en ensayos clínicos 💉💉 10 vacunas han recibido la aprobación para uso de emergencia de la OMS[1], 271 en preclínico, 147',
    urlBlank: "https://www.google.com",
    images: [
      {
        url : '/images/cinco-prioridades-para-reducir-las-brechas-de-investigacion-sobre-cancer-2.webp',
      }
    ],
    comments: [
      {
        user: "Jonathan",
        comment: "primer comentario de post",
        timeStamp: "1d",
        photo: "",
      },
      {
        user: "Jonathan",
        comment: "Segundo comentario de post",
        timeStamp: "1d",
        photo: "",
      },
      {
        user: "Fernando Robles",
        comment: "primer comentario de post",
        timeStamp: "1d",
        photo: "",
      }
    ]
  },
  {
    title: 'Cómo los algoritmos podrían mejorar la atención primaria',
    user: 'Fernando Robles',
    timeStamp: '20 de Julio de 2022',
    description: 'Los algoritmos clínicos automatizados pueden ser tan simples como reglas basadas en la edad que desencadenan una llamada de programación para una vacunación preventiva o tan complejos como una vía que especifica una serie de pruebas y tratamientos para afecciones crónicas como la presión arterial alta.',
    urlBlank: "https://www.google.com",
    images: [
      {
        url : '/images/algoritmos-clinicos-768x557.webp',
      }
    ],
    comments: [
      {
        user: "Jonathan",
        comment: "primer comentario de post primer comentario de post primer comentario de post primer comentario de post primer comentario de post tercer comentario de post tercer comentario de post",
        timeStamp: "5h",
        photo: "",
      },
      {
        user: "Jonathan",
        comment: "Segundo comentario de post",
        timeStamp: "6h",
        photo: "",
      },
      {
        user: "Fernando Robles",
        comment: "tercer comentario de post tercer comentario de post tercer comentario de post",
        timeStamp: "6h",
        photo: "",
      }
    ]
  },
  {
    title: 'title',
    user: 'Fernando Robles',
    timeStamp: '20 de Julio de 2022',
    description: 'Descripcion de la nota del post que puede textear emoticnos tambien 🥳🥳',
    urlBlank: "https://www.google.com",
    images: [
      {
        url : '/images/postImages.jpeg',
      }
    ],
    comments: [
      {
        user: "Jonathan",
        comment: "primer comentario de post",
        timeStamp: "2sem",
        photo: "",
      },
      {
        user: "Jonathan",
        comment: "Segundo comentario de post",
        timeStamp: "2sem",
        photo: "",
      },
      {
        user: "Fernando Robles",
        comment: "primer comentario de post",
        timeStamp: "2sem",
        photo: "",
      }
    ]
  }
]

export default function Blog() {
  return <div className={styles.blog}>
    <div className={styles.menu}>  
      <h4 className={styles.titleMenu}>
        <FcRules fill="white" size="24px" /> 
        <span className={styles.labelCategories}>Categorías</span>
      </h4>
      <ul className={styles.listCategory}>
        <li><FcCalendar /><span>Categoria 1</span></li>
        <li><FcCalendar /><span>Categoria 2</span></li>
        <li><FcCalendar /><span>Categoria 3</span></li>
        <li><FcCalendar /><span>Categoria 4</span></li>
        <li><FcCalendar /><span>Categoria 5</span></li>
        <li><FcCalendar /><span>Categoria 2</span></li>
      </ul>
    </div>
    <div className={styles.feed}>
      <div className={styles.internalFeed}>
        {
          POSTS.map((data, key) => {
            return <Post data={data} key={key} />
          })
        }
      </div>
    </div>
    <div className={styles.users}>
      <h4>Colaboradores</h4>
      <div className={styles.listUsers}>
        <User name="Fernando Robles" />
        <User name="Jonatan Villordo" />
        <User name="Paulina Monroy" />
      </div>
    </div>
  </div>
}
