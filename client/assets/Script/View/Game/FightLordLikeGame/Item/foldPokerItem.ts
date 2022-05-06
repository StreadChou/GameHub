export default class FoldPokerItem extends fgui.GButton {
    private _trans: fgui.Transition;
    public rank: number;
    public suit: number;

    public constructor() {
        super();
    }

    protected onConstruct(): void {
        // this._trans = this.getTransition("HandsCardAdd");
    }

    public playEffect(delay: number): void {
        this.visible = false;
        // this._trans.play(null, 1, delay);
    }

    setPoker(poker: { suit: number, rank: number }) {
        this.suit = poker.suit;
        this.rank = poker.rank;
    }

    useFont() {
        this.icon = `Poker/poker_${this.suit}_${this.rank}`;
    }

    useBackground() {
        this.icon = `Poker/poker_0_0`;
    }
}
