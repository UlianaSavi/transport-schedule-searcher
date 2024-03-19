export interface ISearchResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
  interval_segments: [
    {
      from: {
        code: string;
        title: string;
        popular_title: string;
        short_title: string;
        transport_type: string;
        type: string;
        station_type: string;
        station_type_name: string;
      };
      thread: {
        uid: string;
        title: string;
        interval: {
          density: string;
          end_time: string;
          begin_time: string;
        };
        number: string;
        short_title: string;
        thread_method_link: string;
        carrier: {
          code: number;
          contacts: string;
          url: string;
          logo_svg: string | null;
          title: string;
          phone: string;
          codes: {
            icao: string | null;
            sirena: string;
            iata: string;
          };
          address: string;
          logo: string;
          email: string;
        };
        transport_type: string;
        vehicle: string;
        transport_subtype: {
          color: string;
          code: string;
          title: string;
        };
        express_type: string | null;
      };
      departure_platform: string;
      stops: string;
      departure_terminal: string | null;
      to: {
        code: string;
        title: string;
        popular_title: string;
        short_title: string;
        transport_type: string;
        type: string;
        station_type: string;
        station_type_name: string;
      };
      has_transfers: boolean;
      tickets_info: {
        et_marker: boolean;
        places: [
          {
            currency: string;
            price: {
              cents: number;
              whole: number;
            };
            name: string;
          }
        ];
      };
      duration: number;
      arrival_terminal: string;
      start_date: string;
      arrival_platform: string;
    }
  ];
  segments: [
    {
      arrival: string;
      from: {
        code: string;
        title: string;
        popular_title: string;
        short_title: string;
        transport_type: string;
        station_type: string;
        station_type_name: string;
        type: string;
      };
      thread: {
        uid: string;
        title: string;
        number: string;
        short_title: string;
        thread_method_link: string;
        carrier: {
          code: number;
          contacts: string;
          url: string;
          logo_svg: string | null;
          title: string;
          phone: string;
          codes: {
            icao: string | null;
            sirena: string;
            iata: string;
          };
          address: string;
          logo: string;
          email: string;
        };
        transport_type: string;
        vehicle: string;
        transport_subtype: {
          color: string;
          code: string;
          title: string;
        };
        express_type: string | null;
      };
      departure_platform: string;
      departure: string;
      stops: string;
      departure_terminal: string | null;
      to: {
        code: string;
        title: string;
        popular_title: string;
        short_title: string;
        transport_type: string;
        station_type: string;
        station_type_name: string;
        type: string;
      };
      has_transfers: boolean;
      tickets_info: {
        et_marker: boolean;
        places: [
          {
            currency: string;
            price: {
              cents: number;
              whole: number;
            };
            name: string;
          }
        ];
      };
      duration: number;
      arrival_terminal: string;
      start_date: string;
      arrival_platform: string;
    },
    {
      arrival: string;
    }
  ];
  search: {
    date: string;
    to: {
      code: string;
      type: string;
      popular_title: string;
      short_title: string;
      title: string;
    };
    from: {
      code: string;
      type: string;
      popular_title: string;
      short_title: string;
      title: string;
    };
  };
}

export interface ISearchRequest {
  from: string,
  to: string,
  apikey: string,
  date?: string, // YYYY-MM-DD
  transport_types?: TransportType,
  format?: "json" | "xml",
  lang?: string,
  system?: string,
  show_systems?: string,
  offset?: number,
  limit?: number,
  add_days_mask?: boolean,
  result_timezone?: string,
  transfers?: boolean,
}

export type SearchFormProps = {
  from: string,
  to: string,
  date: string,
  transportType: TransportType,
}


export enum TransportType {
  none = "Любой",
  plane = "plane",
  train = "train",
  suburban = "suburban",
  bus = "bus",
  water = "water",
  helicopter = "helicopter",
}

export type CitiesResponse = [
  null,
  string[][]
]

export enum Direction {
  from = "from",
  to = "to",
}

