export class EventEmitter {
    private _callbacks: { [x: string]: any; } = {};

    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public on(event: string, fn: Function) {
        return this.addEventListener(event, fn);
    }

    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public addEventListener(event: string, fn: Function) {
        this._callbacks = this._callbacks || {};
        (this._callbacks[event] = this._callbacks[event] || [])
            .push(fn);
        return this;
    }

    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public once(event: string, fn: Function) {
        var self = this;
        this._callbacks = this._callbacks || {};

        function on(...args: any[]) {
            self.off(event, on);
            //TODO:fn.apply(this, args);  //不是很明白为什么要用this
            fn.apply(null, args);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
    }

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public off(event: string | any, fn: Function | any = null) {
        return this.removeAllListeners(event, fn);
    }

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public removeListener(event: string | any, fn: Function | any = null) {
        return this.removeAllListeners(event, fn);
    }

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public removeAllListeners(event: string | any, fn: Function | any = null) {
        this._callbacks = this._callbacks || {};

        // all
        if ((!event) && (!fn)) {
            this._callbacks = {};
            return this;
        }

        // specific event
        var callbacks = this._callbacks[event];
        if (!callbacks) return this;

        // remove all handlers
        if (event && (!fn)) {
            delete this._callbacks[event];
            return this;
        }

        // remove specific handler
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    }

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    public removeEventListener(event: string | any, fn: Function | any) {
        return this.removeAllListeners(event, fn);
    }

    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */
    public emit(event: string, ...args: any[]) {
        this._callbacks = this._callbacks || {};
        var callbacks = this._callbacks[event];
        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, args);
            }
        }

        return this;
    }

    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */
    public listeners(event: string) {
        this._callbacks = this._callbacks || {};
        return this._callbacks[event] || [];
    }

    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */
    public hasListeners(event: string) {
        return !!this.listeners(event).length;
    }
}