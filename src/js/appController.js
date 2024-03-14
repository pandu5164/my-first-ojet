/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcontext', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 'ojs/ojoffcanvas', 'knockout', 'ojs/ojknockoutrouteradapter', 'ojs/ojknockout', 'ojs/ojcore', 'ccdemo-name-badge/loader', 'ojs/ojmodule-element', 'ojs/ojnavigationlist', 'ojs/ojdrawerpopup'],
  function(Context, ResponsiveUtils, ResponsiveKnockoutUtils, CoreRouter, ModuleRouterAdapter, UrlParamAdapter, ArrayDataProvider, OffcanvasUtils, ko, KnockoutRouterAdapter) {

    function ControllerViewModel() {

      //handle announcemnts sent when page change, for accessibility
      this.manner = ko.observable('polite');
      this.message = ko.observable();
      announceHandler = (event) => {
        this.message(event.detail?.message);
        this.manner(event.detail?.manner);
      }
      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      const mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_ONLY);
      this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("Mt First OJET App");
      // User Info used in Global Navigation area
      this.userLogin = ko.observable("john.hancock@oracle.com");

      const navData = [
        { path: "", redirect: "dashboard" },
        { path: "dashboard", detail: { label: "Dashboard", iconClass: "oj-ux-ico-bar-chart" } },
        { path: "books", detail: { label: "Books", iconClass: "oj-ux-ico-book" } },
        { path: "customers", detail: { label: "Customers", iconClass: "oj-ux-ico-contact-group" } },
        { path: "about", detail: { label: "About", iconClass: "oj-ux-ico-information-s" } }
      ];
      // router setup
      const router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();
  
      this.moduleAdapter = new ModuleRouterAdapter(router);
  
      this.selection = new KnockoutRouterAdapter(router);
  
      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      this.navDataProvider = new ArrayDataProvider(navData.slice(1), {keyAttributes: "path"});

      //Drawer
      this.mdScreen.subscribe(() => {OffcanvasUtils.close(this.drawerParams);});
      this.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      //called by navigation drawer toggle button after selection of nav drawer item
      this.toggleDrawer = () => {
        this.navDrawerOn = true;
        return OffcanvasUtils.toggle(this.drawerParams);
      }
      // Footer
      this.footerLinks = [
        { name: 'About Oracle', linkId: 'aboutOracle', linkTarget: 'http://www.oracle.com/us/corporate/index.html#menu-about' },
        { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
        { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
        { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
        { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
      ];
    }

    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
  }
);
