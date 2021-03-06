# frozen_string_literal: true

class AdminCreditsController < AdminController
  def create
    credit = Credit.new
    update_attributes credit
    credit.save!

    render json: CreditSerializer.new(credit)
  end

  def update
    credit = Credit.find params[:id]
    update_attributes credit
    credit.save!

    render json: CreditSerializer.new(credit)
  end

  def destroy
    credit = Credit.find params[:id]
    credit.destroy!

    render nothing: true, status: 204
  end

  private

  def update_attributes(model)
    attrs = credit_attributes

    attrs[:course_type] = case attrs[:course_type]
                          when 'general'
                            Credit::TYPE_GENERAL
                          when 'course'
                            Credit::TYPE_COURSE
                          else
                            Credit::TYPE_NONE
      end

    model.update_attributes attrs
  end

  def credit_attributes
    params.require(:data)
          .require(:attributes)
          .permit(:course_name, :course_id, :course_type, :status)
  end
end
