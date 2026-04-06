export interface Place {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  price: number;
  note: string;
  tip?: string;
  maps_url: string;
  image_query: string;
}
