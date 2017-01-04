
export interface IResults{
    readonly turns: number;
    readonly pot: number;
    readonly success: boolean;
}

export class RouletteGame{

    constructor(private _pot: number, 
        private _target: number, 
        private _stake: number, 
        private _american: boolean = true){
    }

    private _turns: number = 0;
    private _currentLoss: number = 0;

    play(): IResults{
        this.takeTurn();

        return {
            turns: this._turns,
            pot: this._pot,
            success: this._pot >= this._target
        };
    }

    private takeTurn(){
        let stake = this._currentLoss > 0 ? this._currentLoss*2 : this._stake;

        if(this._pot < stake){
            return;
        }

        this._turns++;
        this._pot -= stake;

        const spinResult = this.spin();
        const isEven = this.isEven(spinResult);

        if(isEven){
            this._pot += stake*2;
            this._currentLoss = 0;
        } else {
            this._currentLoss = stake;
        }

        //console.log(`Stake: ${stake} Spin: ${spinResult} Won: ${isEven} Pot: ${this._pot}`);

        if(this._pot >= this._target){
            return;
        }

        this.takeTurn();
    }

    private isEven(result: number): boolean{
        if(result === 0 || result === 37){
            return false;
        }

        return result % 2 === 0;
    }

    private spin(): number{
        const max = this._american ? 38 : 37;
        return Math.floor(Math.random()*max)
    }

}