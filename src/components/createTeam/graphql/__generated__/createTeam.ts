/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TeamInput } from './../../../../model/__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: CreateTeam
// ====================================================

export interface CreateTeam_createTeam {
    __typename: 'TeamDTO';
    id: any | null;
}

export interface CreateTeam {
    createTeam: CreateTeam_createTeam | null;
}

export interface CreateTeamVariables {
    productId?: any | null;
    team?: TeamInput | null;
}
