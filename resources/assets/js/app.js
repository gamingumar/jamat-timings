/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import Home from './views/Home';


require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');

import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import MasjidForm from './views/MasjidForm';
import Master from './components/Master';

const element = document.getElementById('react');

if (element) {
  render(
    <BrowserRouter>
      <Master>
        <Route exact path={'/home'} component={Home} />
        <Route path={'/masjid'} component={MasjidForm} />
      </Master>

    </BrowserRouter>,
    element
  );
}