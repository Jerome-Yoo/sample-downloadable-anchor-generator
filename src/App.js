class App {
    constructor({ $target }) {
        this.$target = $target;
        this.state = {};

        this.setState({});
    }

    setState({type, payload}) {
        if (type === "fileurl") {
            this.state[type] = payload;
        }
        this.render();
    }
    
    render() {
        if (!this.state.fileurl) {
            this.didMount();
            return;
        }

        const $downloadableAnchor = document.createElement("a");
        $downloadableAnchor.href= this.state.fileurl;
        $downloadableAnchor.download = "test.txt";
        $downloadableAnchor.innerText = "test.txt"

        this.$target.append($downloadableAnchor);
        this.didMount();
    }
    
    didMount() {
        if (this.state.fileurl) return; 
        this.setState({type: "fileurl", payload: this.generateURL() });
    }

    generateURL() {
        const mockdata = [
            [1,2,3,4,5,6],
            ["a","a","a","a","a","a"],
            ["b","b","b","b","b","b"],
            [0,0,0,0,0,0]
        ];
        const blob = new Blob(mockdata.map(data => [...data, "\n"]), {type: 'text/plain'});
        const url = window.URL.createObjectURL(blob);
        return url;
    }
}

export default App;