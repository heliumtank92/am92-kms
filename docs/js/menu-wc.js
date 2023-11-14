'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">KMS</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AwsKms.html" data-type="entity-link" >AwsKms</a>
                            </li>
                            <li class="link">
                                <a href="classes/AwsKmsError.html" data-type="entity-link" >AwsKmsError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Kms.html" data-type="entity-link" >Kms</a>
                            </li>
                            <li class="link">
                                <a href="classes/KmsError.html" data-type="entity-link" >KmsError</a>
                            </li>
                            <li class="link">
                                <a href="classes/NodeKms.html" data-type="entity-link" >NodeKms</a>
                            </li>
                            <li class="link">
                                <a href="classes/NodeKmsError.html" data-type="entity-link" >NodeKmsError</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AwsKmsConfig.html" data-type="entity-link" >AwsKmsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommonKmsConfig.html" data-type="entity-link" >CommonKmsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataKeyObject.html" data-type="entity-link" >DataKeyObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataKeyPairObject.html" data-type="entity-link" >DataKeyPairObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EncryptDecryptOptions.html" data-type="entity-link" >EncryptDecryptOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KmsConfig.html" data-type="entity-link" >KmsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KmsErrorMap.html" data-type="entity-link" >KmsErrorMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeKmsConfig.html" data-type="entity-link" >NodeKmsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeKmsExtendedConfig.html" data-type="entity-link" >NodeKmsExtendedConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});