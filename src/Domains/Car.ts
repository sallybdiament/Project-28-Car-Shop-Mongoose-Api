class Car {
    private id?: string;
    private model: string;
    private year: number;
    private color: string;
    private status?: boolean;
    private buyValue: number;
    private doorsQty: number;
    private seatsQty: number;
    
    constructor(
        id: string | undefined, 
        model: string, 
        year: number, 
        color: string,
        status = false,
        buyValue: number,
        doorsQty: number,
        seatsQty: number) {
            this.id = id;
            this.model = model;
            this.year = year;
            this.color = color;
            this.status = status;
            this.buyValue = buyValue;
            this.doorsQty =doorsQty;
            this.seatsQty = seatsQty;
        }

        public getYear() { return this.year; }
        public setYear(value: number) { this.year = value; }

        public getColor() { return this.color; }
        public setColor(value: string) { this.color = value; }

        public getBuyValue() { return this.buyValue; }
        public setBuyValue(value: number) { this.buyValue = value; }

        public getDoorsQty() { return this.doorsQty ;}
        public setDoorsQty(value: number) { this.doorsQty = value; }

        public getSeatsQty() { return this.seatsQty; }
        public setSeatsQty(value: number) { this.seatsQty = value; }

        public getModel() { return this.model; }
        public setModel(model: string) { this.model = model; }

        public getStatus() { return this.status; }
        public setStatus(status: boolean) { this.status = status; }
        
        public setId(id: string) { this.id = id; }
        public getId() { return this.id; }

}

export default Car;