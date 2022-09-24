import { Transportation } from '../entities/transport.entity';

/* ----------------------------------------- */

export const transportProviders = [
  {
    provide: 'TRANSPORT_REPOSITORY',
    useValue: Transportation,
  },
];

/* ----------------------------------------- */

