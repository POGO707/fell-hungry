export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: 'Burgers' | 'Momos' | 'Shawarma & Rolls' | 'Fried Chicken & Snacks' | 'Drinks';
}

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export const IMAGES = {
  hero: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy-_wR1OzZo8KK-akhdTRTl_8uU9U4xDI3H9BzJQMf2GiqMeFBIGs2t_wxYg980UB4kr5w2x_0VZXrehtWD3MioD_gpimnkgBmJvYzjz7eDixDQkCHgO7yLldcvgJ8n6Z-4xMm4VA=s680-w680-h510-rw",
  burger: "https://lh3.googleusercontent.com/p/AF1QipOvrVL9jNxYKJnu2hurOLVn7g5Xf8XzHIrhcgHK=s680-w680-h510-rw",
  momo: "https://lh3.googleusercontent.com/p/AF1QipMAGCHn374xEWRO0e0ZrllzotvYRwn6Rn3S5e6m=s680-w680-h510-rw",
  shawarma: "https://lh3.googleusercontent.com/proxy/UTtezY-ZG0SjvXSzlsuDSn469HbQX9kXp9isewvS_ERVsKaVfMQvUaPWvSHM_BvWEvQDwI1TvgzmLv4dHmhNdyaIlxocrY9JuBGG9h_2G4iKxJUdP0kC2PF8IFQPPXwTE-GVBBFMrmaJVmi0ypq6AlRiqbLI_PM=s680-w680-h510-rw",
  store: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy-_wR1OzZo8KK-akhdTRTl_8uU9U4xDI3H9BzJQMf2GiqMeFBIGs2t_wxYg980UB4kr5w2x_0VZXrehtWD3MioD_gpimnkgBmJvYzjz7eDixDQkCHgO7yLldcvgJ8n6Z-4xMm4VA=s680-w680-h510-rw",
  logo: "https://pps.whatsapp.net/v/t61.24694-24/432200756_536755235515898_3572604169932370838_n.jpg?ccb=11-4&oh=01_Q5Aa3AEWL2LKxb0yDroJKEEf13ZyJ0HJZMNRHcDvNjTbr5Czkw&oe=6932F889&_nc_sid=5e03e0&_nc_cat=104"
};