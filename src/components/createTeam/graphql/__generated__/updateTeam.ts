/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TeamInput } from './../../../../model/__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: UpdateTeam
// ====================================================

export interface UpdateTeam_updateTeam {
    __typename: 'TeamDTO';
    id: any | null;
}

export interface UpdateTeam {
    updateTeam: UpdateTeam_updateTeam | null;
}

export interface UpdateTeamVariables {
    productId?: any | null;
    team?: TeamInput | null;
}
