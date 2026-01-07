/* Obs.: o atributo 'userProfilePicture' deve ser removido quando forem utilizados os dados do backend */

const petImages = [
  require('@assets/images/PetImage1.png'),
  require('@assets/images/PetImage2.png'),
  require('@assets/images/PetImage3.png'),
  require('@assets/images/PetImage4.png'),
];
const profileImages = [
  require('@assets/images/ProfilePicture1.png'),
  require('@assets/images/ProfilePicture2.png'),
  require('@assets/images/ProfilePicture4.png'),
  require('@assets/images/gpets-profile-picture.png'),
];

function generateAddress(index) {
  return `Rua Exemplo ${index}, ${100 + index}
  Fortaleza - CE, 60000-000`;
}

function generatePetPost(id) {
  const noOwner = Math.random() < 0.25;
  const noTemper = Math.random() < 0.2;

  return {
    id,
    type: 'Pet',
    userProfilePicture: profileImages[id % profileImages.length],
    userUsername: `Usuário ${id}`,
    timestamp: `0${(id % 9) + 1}/11/2025 - 1${id % 9}:00`,
    imageUrl: petImages[id % petImages.length],

    isOwner: noOwner ? null : id % 2 === 0,
    name: Math.random() < 0.2 ? 'Sem nome' : `Pet ${id}`,
    status: ['Perdido', 'Encontrado', 'Resgatado', 'Desabrigado'][id % 4],
    date: '00 de dezembro de 2000',
    sex: ['Macho', 'Fêmea'][id % 2],

    breed: ['Caramelo', 'Raça desconhecida', 'Sem raça'][id % 3],

    temper: noTemper
      ? null
      : ['Calmo', 'Bravo', 'Amigável', 'Carinhoso'][id % 4],

    owner: noOwner ? 'Não possui' : `Tutor ${id}`,
    phone: noOwner ? 'Não possui' : '(+DD) 99999-9999',

    description:
      'Lorem ipsum dolor sit amet consectetur. Tristique lorem sit sed et arcu integer.',

    address: generateAddress(id),
    coordinateLat: -3.7319 + id * 0.0001,
    coordinateLng: -38.5267 + id * 0.0001,

    comments:
      Math.random() < 0.5
        ? []
        : [
            {
              userUsername: 'Comentador',
              timestamp: '24/11/2025 - 16:00',
              comment: 'Comentário de teste',
            },
          ],
  };
}

function generateEventPost(id) {
  return {
    id,
    type: 'Evento',
    userProfilePicture: profileImages[id % profileImages.length],
    userUsername: `Organização ${id}`,
    timestamp: `12/11/2025 - 10:00`,
    imageUrl: petImages[id % petImages.length],

    isOwner: null,
    name: `Evento ${id}`,
    status: null,
    date: '10 de dezembro de 2025',
    sex: null,
    breed: '',
    temper: null,
    owner: '',
    phone: '(+DD) 99999-9999',

    description:
      'Evento voltado à adoção e conscientização animal.',

    address: '',
    coordinateLat: null,
    coordinateLng: null,

    comments: [],
  };
}

export const mockedPosts = [
  ...Array.from({ length: 70 }).map((_, index) => {
    const id = index + 1;
    return id % 12 === 0
      ? generateEventPost(id)
      : generatePetPost(id);
  }),
  {
    id: 71,
    type: 'Pet',
    userProfilePicture: require('@assets/images/ProfilePicture4.png'),
    userUsername: 'Rafaela Ferreira',
    timestamp: '26/11/2025 - 14:50',
    imageUrl: require('@assets/images/PetImage4.png'),
    isOwner: false,
    name: 'Duna',
    status: 'Encontrado',
    date: '00 de dezembro de 2000',
    sex: 'Fêmea',
    breed: 'Raça',
    temper: 'Calma',
    owner: 'nome',
    phone: '(+DD) 99999-9999',
    description: 'Lorem ipsum dolor sit amet consectetur. Suscipit tristique ullamcorper faucibus tristique aliquet malesuada. Tristique lorem sit sed et arcu integer.',
    address: '',
    coordinateLat: '',
    coordinateLng: '',
    comments: [
      {
        userUsername: 'Nome do Usuário',
        timestamp: '24/11/2025 - 16:00',
        comment: 'Lorem ipsum dolor sit amet conse ctetur. Suscipit tristique ullamcorper faucibus tristarcu integer descrição completa.',
      }
    ]
  },
  {
    id: 72,
    type: 'Pet',
    userProfilePicture: require('@assets/images/gpets-profile-picture.png'),
    userUsername: 'GPets',
    timestamp: '26/11/2025 - 14:50',
    imageUrl: require('@assets/images/PetImage3.png'),
    isOwner: null,
    name: 'Sem nome',
    status: 'Resgatado',
    date: '00 de dezembro de 2000',
    sex: 'Fêmea',
    breed: 'Sem raça',
    temper: 'Carinhosa',
    owner: 'nome',
    phone: '(+DD) 99999-9999',
    description: 'Lorem ipsum dolor sit amet consectetur. Suscipit tristique ullamcorper faucibus tristique aliquet malesuada. Tristique lorem sit sed et arcu integer.',
    address: '',
    coordinateLat: '',
    coordinateLng: '',
    comments: [
      {
        userUsername: 'Nome do Usuário',
        timestamp: '24/11/2025 - 16:00',
        comment: 'Lorem ipsum dolor sit amet conse ctetur. Suscipit tristique ullamcorper faucibus tristarcu integer descrição completa.',
      }
    ]
  },
  {
    id: 73,
    type: 'Pet',
    userProfilePicture: require('@assets/images/ProfilePicture2.png'),
    userUsername: 'Vitória Vasconcelos',
    timestamp: '24/11/2025 - 16:00',
    imageUrl: require('@assets/images/PetImage2.png'),
    isOwner: false,
    name: 'Sem nome',
    status: 'Desabrigado',
    date: '00 de dezembro de 2000',
    sex: 'Fêmea',
    breed: 'Caramelo',
    temper: 'Amigável',
    owner: 'nome',
    phone: '(+DD) 99999-9999',
    description: 'Lorem ipsum dolor sit amet consectetur. Suscipit tristique ullamcorper faucibus tristique aliquet malesuada. Tristique lorem sit sed et arcu integer.',
    address: '',
    coordinateLat: '',
    coordinateLng: '',
    comments: [
      {
        userUsername: 'Nome do Usuário',
        timestamp: '24/11/2025 - 16:00',
        comment: 'Lorem ipsum dolor sit amet conse ctetur. Suscipit tristique ullamcorper faucibus tristarcu integer descrição completa.',
      },
      {
        userUsername: 'Nome do Usuário',
        timestamp: '24/11/2025 - 16:00',
        comment: 'fala bro yoooooooooo'
      }
    ]
  },
  {
    id: 74,
    type: 'Pet',
    userProfilePicture: require('@assets/images/ProfilePicture1.png'),
    userUsername: 'Joana Dark',
    timestamp: '10/11/2025 - 08:00',
    imageUrl: require('@assets/images/PetImage1.png'),
    isOwner: true,
    name: 'Beto',
    status: 'Perdido',
    date: '00 de dezembro de 2000',
    sex: 'Macho',
    breed: 'Sem raça',
    temper: 'Bravo',
    owner: 'nome',
    phone: '(+DD) 99999-9999',
    description: 'Lorem ipsum dolor sit amet consectetur. Suscipit tristique ullamcorper faucibus tristique aliquet malesuada. Tristique lorem sit sed et arcu integer.',
    address: '',
    coordinateLat: '',
    coordinateLng: '',
    comments: [
      {
        userUsername: 'Cláudio',
        timestamp: '24/11/2025 - 16:00',
        comment: 'cachorro kkkkkkkkk'
      },
      {
        userUsername: 'Nome do Usuário',
        timestamp: '24/11/2025 - 16:00',
        comment: 'Lorem ipsum dolor sit amet conse ctetur. Suscipit tristique ullamcorper faucibus tristarcu integer descrição completa.',
      },
      {
        userUsername: 'Nome do Usuário',
        timestamp: '24/11/2025 - 16:00',
        comment: 'é um cachorro'
      }
    ]
  },
]