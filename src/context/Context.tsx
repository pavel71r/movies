import React from 'react';

import type { GenreType } from '../Types';

const { Provider, Consumer } = React.createContext<Array<GenreType>>([{ id: 0, name: '' }]);
export { Provider, Consumer };
