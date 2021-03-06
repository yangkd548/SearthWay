module Dylan {
    export class DfsSearch extends BaseSearch {
        private readonly oppoFirst: boolean = true;

        private _isOver: boolean = false;
        protected get isOver(): boolean {
            return this._isOver;
        }

        // public SearchCustomSteps(): void {
        //     switch (this.searchStep) {
        //         case E_SearchStep.OncePoint:
        //             if (this.driveTimes % 1 == 0) {
        //                 this.DoSearchSteps();
        //             }
        //             break;
        //         default:
        //             this.DoSearchSteps();
        //             break;
        //     }
        // }

        protected DoSearchOneStep(): void {
            if (!this.isRunning) return;
            this.AddStep();
            if (this.curPoint == null) {
                this.SetCurPoint(this.startPoint);
            }
            let hasUnvisited = false;
            let neighbors: MapPoint[] = this.mapGraph.GetNeighbors(this.curPoint, this.oppoFirst);
            for (let next of neighbors) {
                if (next.isOpened) {
                    hasUnvisited = true;
                    this.AddFrontierPoint(next);
                    break;
                }
            }
            if (!this.isSucc && !hasUnvisited) {
                this.Recall();
            }
        }

        protected AddFrontierPoint(point: MapPoint): void {
            super.AddFrontierPoint(point);
            if(this.isSucc) return;
            this.SetCurPoint(point);
        }

        private Recall(): void {
            this.curPoint.SetIsClosed();
            if (this.curPoint.parent == null) {
                this._isOver = true;
            }
            else {
                this.SetCurPoint(this.curPoint.parent);
            }
        }

        public Clear(): void {
            this._isOver = false;
            super.Clear();
        }
    }
}