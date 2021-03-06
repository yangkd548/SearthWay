module Dylan {
    export abstract class BaseBfsSearch extends BaseSearch {
        protected readonly oppoFirst: boolean = false;
        protected frontier: MapPoint[] = [];
        private fromStartDis: number = 0;

        protected get isOver(): boolean {
            return this.frontier.length == 0;
        }

        public Start(): boolean {
            if (super.Start()) {
                this.AddFrontierPoint(this.startPoint);
                return true;
            }
            return false;
        }

        // public SearchCustomSteps(): void {
        //     switch (this.searchStep) {
        //         case E_SearchStep.OncePoint:
        //             if (this.driveTimes % 1 == 0) {
        //                 this.DoSearchSteps();
        //             }
        //             break;
        //         case E_SearchStep.OnceRound:
        //             if (this.driveTimes % 10 == 0) {
        //                 this.SearchOneRound();
        //             }
        //             break;
        //         case E_SearchStep.OnceSide:
        //             if (this.driveTimes % 3 == 0) {
        //                 this.SearchOneSide();
        //             }
        //             break;
        //         default:
        //             this.DoSearchSteps();
        //             break;
        //     }
        // }

        // private SearchOneRound(): void {
        //     this.fromStartDis++;
        //     console.log("---------------", this.fromStartDis);
        //     while (this.frontier.length > 0) {
        //         let next = this.frontier[0];
        //         if (Math.abs(next.x - this.mapGraph.startPoint.x) + Math.abs(next.y - this.mapGraph.startPoint.y) > this.fromStartDis) {
        //             break;
        //         }
        //         this.DoSearchOneStep();
        //     }
        //     if (this.isOver) {
        //         Laya.timer.clear(this, this.SearchOneRound);
        //         this.fromStartDis = 0;
        //     }
        // }

        // private SearchOneSide(): void {
        //     if (this.frontier.length > 0) {
        //         let flag = null;
        //         while (this.frontier.length > 0) {
        //             let next = this.frontier[0];
        //             let newFlag = (next.x - this.mapGraph.startPoint.x) / (next.y - this.mapGraph.startPoint.y + 0.001) > 0;
        //             if (flag == null) {
        //                 flag = newFlag;
        //             }
        //             else if (flag != newFlag) {
        //                 break;
        //             }
        //             this.DoSearchOneStep();
        //         }
        //     }
        //     if (this.isOver) {
        //         Laya.timer.clear(this, this.SearchOneSide);
        //     }
        // }

        protected abstract DoSearchOneStep(): void;

        protected SetCurPoint(value: MapPoint): void {
            super.SetCurPoint(value);
            this.curPoint.SetIsClosed();
        }

        public Clear(): void {
            this.frontier.splice(0);
            super.Clear();
        }
    }
}