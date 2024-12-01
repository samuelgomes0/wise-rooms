const SUCCESS = {
  LOGIN: {
    TITLE: "Login realizado com sucesso! 🎉",
    DESCRIPTION:
      "Seja bem-vindo(a) de volta! Você está conectado(a) e pronto(a) para utilizar o sistema.",
  },
  LOGOUT: {
    TITLE: "Logout realizado com sucesso! 🎉",
    DESCRIPTION:
      "Você foi desconectado(a) do sistema. Esperamos vê-lo(a) novamente em breve!",
  },
  BOOKING: {
    CREATE_TITLE: "Reserva criada com sucesso! 🎉",
    CREATE_DESCRIPTION:
      "Sua reserva foi concluída com sucesso. Os detalhes foram registrados e a sala estará disponível no horário selecionado.",
    CANCEL_TITLE: "Reserva cancelada com sucesso! 🎉",
    CANCEL_DESCRIPTION:
      "Sua reserva foi cancelada com sucesso. A sala está disponível para outras reservas no mesmo horário.",
  },
  ROOM: {
    TITLE: "Sala criada com sucesso! 🎉",
    DESCRIPTION:
      "A sala foi cadastrada no sistema com sucesso. Ela já está disponível para reservas.",
    DELETE_TITLE: "Sala deletada com sucesso! 🎉",
    DELETE_DESCRIPTION:
      "A sala foi removida do sistema com sucesso. Todas as reservas associadas a ela foram canceladas.",
  },
  RESOURCE: {
    TITLE: "Recurso criado com sucesso! 🎉",
    DESCRIPTION:
      "O recurso foi cadastrado na sala com sucesso. Ele já está disponível para uso nas reservas associadas a essa sala.",
    DELETE_TITLE: "Recurso deletado com sucesso! 🎉",
    DELETE_DESCRIPTION:
      "O recurso foi removido da sala com sucesso. Ele não estará mais disponível para uso nas reservas associadas a essa sala.",
  },
  USER: {
    TITLE: "Usuário criado com sucesso! 🎉",
    DESCRIPTION:
      "O usuário foi criado no sistema com sucesso. Ele já pode acessar sua conta e utilizar os recursos disponíveis.",
    DELETE_TITLE: "Usuário deletado com sucesso! 🎉",
    DELETE_DESCRIPTION:
      "O usuário foi removido do sistema com sucesso. Ele não poderá mais acessar sua conta e utilizar os recursos disponíveis.",
  },
};

const ERROR = {
  LOGIN: {
    TITLE: "Erro ao fazer login! 😔",
    DESCRIPTION:
      "Houve um erro ao tentar fazer login. Por favor, verifique suas credenciais e tente novamente.",
  },
  BOOKING: {
    TITLE: "Erro ao criar reserva! 😔",
    DESCRIPTION:
      "Houve um erro ao tentar criar a reserva. Por favor, tente novamente mais tarde.",
  },
  ROOM: {
    TITLE: "Erro ao criar sala! 😔",
    DESCRIPTION:
      "Houve um erro ao tentar criar a sala. Por favor, tente novamente mais tarde.",
  },
  RESOURCE: {
    TITLE: "Erro ao criar recurso! 😔",
    DESCRIPTION:
      "Houve um erro ao tentar criar o recurso. Por favor, tente novamente mais tarde.",
    DELETE_TITLE: "Erro ao deletar recurso! 😔",
    DELETE_DESCRIPTION:
      "Houve um erro ao tentar deletar o recurso. Por favor, tente novamente mais tarde.",
  },
  USER: {
    TITLE: "Erro ao criar usuário! 😔",
    DESCRIPTION:
      "Houve um erro ao tentar criar o usuário. Por favor, tente novamente mais tarde.",
    DELETE_TITLE: "Erro ao deletar usuário! 😔",
    DELETE_DESCRIPTION:
      "Houve um erro ao tentar deletar o usuário. Por favor, tente novamente mais tarde.",
  },
};

export { ERROR, SUCCESS };
