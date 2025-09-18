import { Product } from '@/types/menu';
import hamburgerClassic from '@/assets/hamburger-classic.jpg';
import hotDogClassic from '@/assets/hot-dog-classic.jpg';
import sodaCold from '@/assets/soda-cold.jpg';
import friesGolden from '@/assets/fries-golden.jpg';

export const PRODUCTS: Product[] = [
  // Hamburguesas
  {
    id: 'hamburguesa-clasica',
    name: 'Hamburguesa Clásica',
    description: 'Jugosa carne de res, lechuga fresca, tomate, cebolla y nuestra salsa especial',
    price: 120,
    image: hamburgerClassic,
    category: 'hamburguesas'
  },
  {
    id: 'hamburguesa-doble',
    name: 'Hamburguesa Doble',
    description: 'Doble carne de res, queso americano, tocino crujiente y verduras frescas',
    price: 180,
    image: hamburgerClassic,
    category: 'hamburguesas'
  },
  {
    id: 'hamburguesa-bbq',
    name: 'Hamburguesa BBQ',
    description: 'Carne de res con salsa BBQ, aros de cebolla, queso cheddar y tocino',
    price: 160,
    image: hamburgerClassic,
    category: 'hamburguesas'
  },

  // Hot Dogs
  {
    id: 'hotdog-clasico',
    name: 'Hot Dog Clásico',
    description: 'Salchicha de res en pan brioche con mostaza, ketchup y cebolla',
    price: 80,
    image: hotDogClassic,
    category: 'hotdogs'
  },
  {
    id: 'hotdog-especial',
    name: 'Hot Dog Especial',
    description: 'Salchicha premium con guacamole, pico de gallo y queso oaxaca',
    price: 110,
    image: hotDogClassic,
    category: 'hotdogs'
  },
  {
    id: 'hotdog-chilango',
    name: 'Hot Dog Chilango',
    description: 'Salchicha envuelta en tocino, frijoles, cebolla, jalapeño y salsa verde',
    price: 130,
    image: hotDogClassic,
    category: 'hotdogs'
  },

  // Bebidas
  {
    id: 'refresco-cola',
    name: 'Refresco de Cola',
    description: 'Refresco de cola bien frío, 500ml',
    price: 25,
    image: sodaCold,
    category: 'bebidas'
  },
  {
    id: 'agua-natural',
    name: 'Agua Natural',
    description: 'Agua purificada, 600ml',
    price: 15,
    image: sodaCold,
    category: 'bebidas'
  },
  {
    id: 'jugo-naranja',
    name: 'Jugo de Naranja',
    description: 'Jugo de naranja natural recién exprimido, 400ml',
    price: 35,
    image: sodaCold,
    category: 'bebidas'
  },

  // Acompañantes
  {
    id: 'papas-fritas',
    name: 'Papas Fritas',
    description: 'Papas doradas y crujientes con sal de mar',
    price: 40,
    image: friesGolden,
    category: 'acompanantes'
  },
  {
    id: 'aros-cebolla',
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla empanizados y fritos hasta quedar dorados',
    price: 50,
    image: friesGolden,
    category: 'acompanantes'
  },
  {
    id: 'nachos-queso',
    name: 'Nachos con Queso',
    description: 'Totopos crujientes con queso cheddar derretido y jalapeños',
    price: 60,
    image: friesGolden,
    category: 'acompanantes'
  },

  // Promociones
  {
    id: 'combo-clasico',
    name: 'Combo Clásico',
    description: 'Hamburguesa clásica + papas fritas + refresco',
    price: 150,
    image: hamburgerClassic,
    category: 'promociones'
  },
  {
    id: 'combo-hotdog',
    name: 'Combo Hot Dog',
    description: 'Hot dog especial + papas fritas + bebida',
    price: 120,
    image: hotDogClassic,
    category: 'promociones'
  }
];