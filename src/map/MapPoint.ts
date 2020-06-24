module Dylan {

    export class MapPoint {
        public static readonly PointCostChanged: string = "PointCostChanged";

        private _x: number;
        public get x(): number {
            return this._x;
        }

        private _y: number;
        public get y(): number {
            return this._y;
        }

        private _id:number;
        public get id():number{
            return this._id;
        }

        public SetValue(graph:MapGraph, x: number, y: number, weight: number = 1): void {
            x = Math.min(graph.width - 1, Math.max(0, x));
            y = Math.min(graph.height - 1, Math.max(0, y));
            this._x = x;
            this._y = y;
            this._weight = weight;
            this._id =  this.x + this.y * graph.width;
        }

        public get key(): string {
            return this._x + "_" + this._y;
        }

        //权值（权重）
        private readonly OriginWeight: number = 1;
        private _weight: number = this.OriginWeight;
        public get weight(): number {
            return this._weight;
        }
        public SetWeight(weight: number): void {
            if(weight>=1 && this._weight <= Number.MAX_VALUE){
                this._weight = weight;
                GEventMgr.Emit(MapPoint.PointCostChanged);
            }            
        }

        public ResetWeight():void{
            this._weight = this.OriginWeight;
        }

        public parent: MapPoint;

        // private _cost:number = 1;
        // public get cost():number{
        //     return this._cost;
        // }

        public GetNextWeight():number{
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
        }

        public _isProcess: boolean = false;
        public get isProcess(): boolean {
            return this._isProcess;
        }
        public SetIsProcess(): void {
            this._isProcess = true;
            this._isVisited = false;
        }
        // public CanelIsProcess():void{
        //     this.SetIsUnvisited();
        // }

        private _isVisited: boolean = false;
        public get isVisited(): boolean {
            return this._isVisited;
        }
        public SetIsVisited(): void {
            this._isVisited = true;
            this._isProcess = false;
        }
        // public CanelIsVisited(): void {
        //     this.SetIsProcess();
        // }

        public SetIsUnvisited():void{
            this._isProcess = false;
            this._isVisited = false;
        }
        public get isUnvisited(): boolean {
            return !this._isVisited && !this._isProcess;
        }

        public Reset(): void {
            this._weight = this.OriginWeight;
            this._x = -1;
            this._y = -1;
            this._weight = this.OriginWeight;
            this._isProcess = false;
            this._isVisited = false;
            this.parent = null;
        }

        public IsSamePos(other:MapPoint):boolean{
            return other && this.x == other.x && this.y == other.y;
        }
    }
}