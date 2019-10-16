import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';

// constants
import { RouteI } from './RoutesConstants';
import { config } from '../../../config';

// components
import PageLayoutTemplate from '../../common/templates/PageLayout/PageLayoutTemplate';
import PageNotFound from '../atoms/PageNotFound';
import FakeAuth from '../../authentication/pages/FakeAuth/FakeAuth';

// interfaces
import { QueryCurrentUser_currentUser } from '../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { QueryAllProducts_allProducts } from '../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

// services
import { prepareRoutes } from '../helpers/routesHelper';

export const history = createHashHistory();

interface RoutesPresenterProps {
    selectedProduct: QueryAllProducts_allProducts;
    currentUser: QueryCurrentUser_currentUser;
}

export default (props: RoutesPresenterProps) => {
    const { selectedProduct, currentUser } = props;
    const [allowedRoutes, setAllowedRoutes] = useState<RouteI[]>([]);

    useEffect(() => {
        if (currentUser) {
            setAllowedRoutes(prepareRoutes(currentUser));
        }
    }, [selectedProduct, currentUser]);

    return (
        <PageLayoutTemplate allowedRoutes={allowedRoutes} selectedProduct={selectedProduct}>
            <Router history={history}>
                <Switch>
                    {config.env === 'local' ? <Route exact={true} path="/fake-auth" component={FakeAuth} /> : null}
                    {allowedRoutes.map((item: RouteI, index) => (
                        <Route exact={true} key={index} path={item.path} component={item.component} />
                    ))}
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        </PageLayoutTemplate>
    );
};
