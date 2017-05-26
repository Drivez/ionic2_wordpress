/**
 * @hidden
 */
var Core = (function () {
    function Core(deps) {
        /**
         * @private
         */
        this._version = '0.16.0';
        this.config = deps.config;
        this.logger = deps.logger;
        this.emitter = deps.emitter;
        this.insights = deps.insights;
    }
    Core.prototype.init = function () {
        this.registerEventHandlers();
        this.onResume();
    };
    Object.defineProperty(Core.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Core.prototype.onResume = function () {
        if (this.insights.options.enabled) {
            this.insights.track('mobileapp.opened');
        }
    };
    /**
     * @private
     */
    Core.prototype.registerEventHandlers = function () {
        var _this = this;
        this.emitter.on('cordova:resume', function () {
            _this.onResume();
        });
        this.emitter.on('push:notification', function (data) {
            if (data.message.app.asleep || data.message.app.closed) {
                if (_this.insights.options.enabled) {
                    _this.insights.track('mobileapp.opened.push');
                }
            }
        });
    };
    return Core;
}());
export { Core };
