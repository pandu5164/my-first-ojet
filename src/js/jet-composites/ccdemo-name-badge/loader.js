/**
  Copyright (c) 2015, 2023, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./ccdemo-name-badge-view.html', './ccdemo-name-badge-viewModel', 'text!./component.json', 'css!./ccdemo-name-badge-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('ccdemo-name-badge', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);