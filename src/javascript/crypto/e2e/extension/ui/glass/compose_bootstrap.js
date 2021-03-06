/**
 * @license
 * Copyright 2015 Yahoo Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Bootstraps the compose glass.
 */

goog.require('e2e.ext.ui.ComposeGlass');
goog.require('e2e.ext.utils.text');

goog.provide('e2e.ext.ui.glass.compose.bootstrap');


var initComposeGlass = function(evt) {
  window.removeEventListener('message', initComposeGlass);
  if (!e2e.ext.utils.text.isYmailOrigin(evt.origin)) {
    console.log('Got message from unsafe origin', evt.origin);
    return false;
  }
  var data = evt.data;
  data.draft = data.draft || null;
  if (!data.draft || !data.mode || !data.hash) {
    return;
  }
  if (data.draft.subject === 'Encrypted Message') {
    // This is a placeholder subject from Encryptr. let's ignore it for now to
    // make the unencrypted subject warning visible by default.
    data.draft.subject = '';
  }
  /** @type {!e2e.ext.ui.ComposeGlass} */
  window.composeGlass = new e2e.ext.ui.ComposeGlass(data.draft,
                                                    data.mode,
                                                    evt.origin,
                                                    data.hash,
                                                    data.height);
  window.composeGlass.decorate(document.documentElement);
};
window.addEventListener('message', initComposeGlass);


/**
 * Specifies whether the looking glass has been bootstrapped.
 * @type {boolean}
 */
e2e.ext.ui.glass.compose.bootstrap = true;
