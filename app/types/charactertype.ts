export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: {
    name: string;
    air_date: string;
    episode: string;
  }[];
  created: string;
};

export type CharacterInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};