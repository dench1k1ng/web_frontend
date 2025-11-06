// Task 0: Setup - jQuery Document Ready
$(document).ready(function () {
    console.log("jQuery is ready!");

    // Task 1: Selectors & CSS
    let contentChanged = false;
    let stylesChanged = false;

    $('#change-content').click(function () {
        if (!contentChanged) {
            // Select by ID and change content
            $('#demo-id').text('Changed by ID selector!');
            // Select by class and change HTML
            $('.demo-class').html('<strong>Changed by class selector!</strong>');
            // Select by tag and change content
            $('h3').text('Changed by tag selector!');
            $(this).text('Reset Content');
            contentChanged = true;
        } else {
            // Reset to original content
            $('#demo-id').text('Element selected by ID');
            $('.demo-class').text('Element selected by class');
            $('h3').text('Element selected by tag');
            $(this).text('Change Content');
            contentChanged = false;
        }
    });

    $('#change-styles').click(function () {
        if (!stylesChanged) {
            // Change styles with CSS
            $('#demo-id').css('background-color', 'red');
            $('#demo-id').css('color', 'white');
            $('.demo-class').css('background-color', 'blue');
            $('.demo-class').css('color', 'white');
            $('h3').css('color', 'green');
            $(this).text('Reset Styles');
            stylesChanged = true;
        } else {
            // Reset to original styles
            $('#demo-id').css('background-color', '');
            $('#demo-id').css('color', '');
            $('.demo-class').css('background-color', '');
            $('.demo-class').css('color', '');
            $('h3').css('color', '');
            $(this).text('Change Styles');
            stylesChanged = false;
        }
    });

    // Task 2: Visibility Methods
    $('#hide-btn').click(function () {
        $('#visibility-demo').hide();
    });

    $('#show-btn').click(function () {
        $('#visibility-demo').show();
    });

    $('#toggle-btn').click(function () {
        $('#visibility-demo').toggle();
    });

    // Task 3: Fade Methods
    $('#fade-in-btn').click(function () {
        $('#fade-image').fadeIn();
    });

    $('#fade-out-btn').click(function () {
        $('#fade-image').fadeOut();
    });

    $('#fade-toggle-btn').click(function () {
        $('#fade-image').fadeToggle();
    });

    // Task 4: Slide Methods
    $('#slide-toggle-btn').click(function () {
        $('#slide-panel').slideToggle();
    });

    $('#slide-up-btn').click(function () {
        $('#slide-panel').slideUp();
    });

    $('#slide-down-btn').click(function () {
        $('#slide-panel').slideDown();
    });

    // Task 5: Add & Remove Elements
    var itemCounter = 3;

    $('#add-item-btn').click(function () {
        $('#dynamic-list').append('<li>New Item ' + itemCounter + '</li>');
        itemCounter++;
    });

    $('#remove-item-btn').click(function () {
        $('#dynamic-list li:last').remove();
    });

    $('#prepend-item-btn').click(function () {
        $('#dynamic-list').prepend('<li>First Item ' + itemCounter + '</li>');
        itemCounter++;
    });


    let imageChanged = false;
    let linkChanged = false;
    // Task 6: Modifying Attributes
    $('#change-image-btn').click(function () {
        if (!imageChanged) {
            $('#dynamic-image').attr('src', 'https://via.placeholder.com/150x100/FF0000/blue?text=Changed');
            $(this).text('Reset Image');
            imageChanged = true;
        } else {
            $('#dynamic-image').attr('src', 'https://via.placeholder.com/150x100/FF5722/blue?text=Image+1');
            $(this).text('Change Image');
            imageChanged = false;
        }
    });

    $('#change-link-btn').click(function () {
        if (!linkChanged) {
            $('#dynamic-link').attr('href', 'https://www.bing.com');
            $('#dynamic-link').text('Bing Website');
            $(this).text('Reset Link');
            linkChanged = true;
        } else {
            $('#dynamic-link').attr('href', 'https://www.google.com');
            $('#dynamic-link').text('Google Website');
            $(this).text('Change Link');
            linkChanged = false;
        }
    });

    // Task 7: Form Interaction
    $('#name-input').on('input', function () {
        var nameValue = $(this).val();
        $('#name-display').text(nameValue);
    });

    $('#email-input').on('input', function () {
        var emailValue = $(this).val();
        $('#email-display').text(emailValue);
    });

    // Task 8: Basic Animation
    $('#animate-basic-btn').click(function () {
        $('#animate-box').animate({
            width: '200px',
            height: '200px',
            left: '100px'
        });
    });

    $('#reset-box-btn').click(function () {
        $('#animate-box').animate({
            width: '100px',
            height: '100px',
            left: '0px'
        });
    });

    // Task 9: Sequential Animations
    $('#animate-sequence-btn').click(function () {
        $('#sequence-box')
            .css('backgroundColor', '#ff6b6b')
            .animate({ left: '200px' })
            .queue(function (next) {
                $(this).css('backgroundColor', '#4ecdc4');
                next();
            })
            .animate({ top: '100px' })
            .queue(function (next) {
                $(this).css('backgroundColor', '#45b7d1');
                next();
            })
            .animate({ width: '50px', height: '50px' })
            .queue(function (next) {
                $(this).css('backgroundColor', '#96ceb4');
                next();
            })
            .animate({ left: '0px', top: '0px', width: '100px', height: '100px' });
    });

    // Task 10: Combined Animation
    $('#animate-combined-btn').click(function () {
        $('#combined-box').animate({
            opacity: 0.1,
            width: '200px',
            height: '150px',
            left: '100px'
        });
    });

    $('#reset-combined-btn').click(function () {
        $('#combined-box').animate({
            opacity: 1,
            width: '100px',
            height: '100px',
            left: '0px'
        });
    });

    // Task 11: Mini Project - Image Gallery
    $('.thumbnail').click(function () {
        var newSrc = $(this).data('large');
        $('#large-image').attr('src', newSrc);

        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
    });
});
