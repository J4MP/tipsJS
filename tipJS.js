export default {
    gererateRandomColor: () => {
        return `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
    }
}