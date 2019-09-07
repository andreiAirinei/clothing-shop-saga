import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
    // If we do not pass [], component will render twice
    // First time when mounting the shop which triggers our useEffect to call for fetchCollectionsStart()
    // Second time is after when our check current user session gets fired, gecause currentUser fro App changes
    // It occurs when the user is logged in and we refresh the shop page

    // Again, we pass the fetchCollectionsStart into array because of -> SEE APP.JS COMMENT <-
  }, [fetchCollectionsStart]);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
