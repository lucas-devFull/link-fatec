import styled from 'styled-components';
import * as styleguide from './stylesGlobals';

export const FlexRow = styled.div`
    align-items: flex-end;
    display: flex;
    > * {
        margin-right: ${styleguide.SPACING_INLINE_02};
    }
`;
