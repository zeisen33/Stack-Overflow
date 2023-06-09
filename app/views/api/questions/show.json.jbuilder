# debugger
# key = @question.id
json.question do
    # debugger
    json.extract! @question, :id, :title, :body, :asker_id
end

# json.user do
#     json.partial! '/api/users/user', user: @question.asker
# end

json.asker do 
    json.extract! @question.asker, :id, :display_name
end

json.answers do
    @question.answers.each do |answer|
        json.set! answer.id do
            json.extract! answer, :body, :id, :question_id, :author_id, :votes
        end
    end
    # @question.answers.sort_by {|answer|
    #     debugger
    #     count = 0
    #     answer.votes.each do |vote|
    #         debugger
    #         if vote.direction == true
    #             count += 1
    #         elsif vote.direction == false
    #             count -= 1
    #         end
    #     end
    # }
    # debugger
end