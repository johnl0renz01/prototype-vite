var FaceExpression = (function () {
    var imageLink = "";

    var setImage = function (string) {
        imageLink = "C:/xampp/htdocs/Prototype-Vite/my-project/src/components/facial_expressions/PIA-Mad.png";
        return imageLink;
    };

    var getImage = function () {
        return imageLink;
    };

    return {
        setImage: setImage,
        getImage: getImage
    }

})();

export default FaceExpression;

