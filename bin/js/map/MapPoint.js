var Dylan;
(function (Dylan) {
    var MapPoint = /** @class */ (function () {
        function MapPoint() {
            //权值（权重）
            this.OriginWeight = 1;
            this._weight = this.OriginWeight;
            this._isProcess = false;
            // public CanelIsProcess():void{
            //     this.SetIsUnvisited();
            // }
            this._isVisited = false;
        }
        Object.defineProperty(MapPoint.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MapPoint.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MapPoint.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        MapPoint.prototype.SetValue = function (graph, x, y, weight) {
            if (weight === void 0) { weight = 1; }
            x = Math.min(graph.width - 1, Math.max(0, x));
            y = Math.min(graph.height - 1, Math.max(0, y));
            this._x = x;
            this._y = y;
            this._weight = weight;
            this._id = this.x + this.y * graph.width;
        };
        Object.defineProperty(MapPoint.prototype, "key", {
            get: function () {
                return this._x + "_" + this._y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MapPoint.prototype, "weight", {
            get: function () {
                return this._weight;
            },
            enumerable: false,
            configurable: true
        });
        MapPoint.prototype.SetWeight = function (weight) {
            if (weight >= 1 && this._weight <= Number.MAX_VALUE) {
                this._weight = weight;
                Dylan.GEventMgr.Emit(MapPoint.PointCostChanged);
            }
        };
        MapPoint.prototype.ResetWeight = function () {
            this._weight = this.OriginWeight;
        };
        // private _cost:number = 1;
        // public get cost():number{
        //     return this._cost;
        // }
        MapPoint.prototype.GetNextWeight = function () {
            switch (this._weight) {
                case this.OriginWeight:
                    return Number.MAX_VALUE;
                    break;
                case Number.MAX_VALUE:
                    return -1;
                    break;
                default:
                    return this.OriginWeight;
                    break;
            }
        };
        Object.defineProperty(MapPoint.prototype, "isProcess", {
            get: function () {
                return this._isProcess;
            },
            enumerable: false,
            configurable: true
        });
        MapPoint.prototype.SetIsProcess = function () {
            this._isProcess = true;
            this._isVisited = false;
        };
        Object.defineProperty(MapPoint.prototype, "isVisited", {
            get: function () {
                return this._isVisited;
            },
            enumerable: false,
            configurable: true
        });
        MapPoint.prototype.SetIsVisited = function () {
            this._isVisited = true;
            this._isProcess = false;
        };
        // public CanelIsVisited(): void {
        //     this.SetIsProcess();
        // }
        MapPoint.prototype.SetIsUnvisited = function () {
            this._isProcess = false;
            this._isVisited = false;
        };
        Object.defineProperty(MapPoint.prototype, "isUnvisited", {
            get: function () {
                return !this._isVisited && !this._isProcess;
            },
            enumerable: false,
            configurable: true
        });
        MapPoint.prototype.Reset = function () {
            this._weight = this.OriginWeight;
            this._x = -1;
            this._y = -1;
            this._weight = this.OriginWeight;
            this._isProcess = false;
            this._isVisited = false;
            this.parent = null;
        };
        MapPoint.prototype.IsSamePos = function (other) {
            return other && this.x == other.x && this.y == other.y;
        };
        MapPoint.PointCostChanged = "PointCostChanged";
        return MapPoint;
    }());
    Dylan.MapPoint = MapPoint;
})(Dylan || (Dylan = {}));
//# sourceMappingURL=MapPoint.js.map